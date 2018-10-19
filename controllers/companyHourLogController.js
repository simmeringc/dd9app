const mongoose = require('mongoose');

const CompanyHourLog = mongoose.model('CompanyHourLog');
const TimeEntry = mongoose.model('TimeEntry');

exports.openCompanyHourLogs = async (req, res) => {
  const openCompanyHourLogs = await CompanyHourLog.find({ dateClosed: new Date(0) }).populate('company');
  console.log(openCompanyHourLogs);
  res.json(openCompanyHourLogs);
};

exports.closedHourLogs = async (req, res) => {
  const closedCompanyHourLogs = await CompanyHourLog.find({ dateClosed: { $ne: new Date(0) } }).populate('company').limit(200).sort({ dateOpened: -1 });
  res.json(closedCompanyHourLogs);
};

exports.one = async (req, res) => {
  const { companyHourLogId } = req.params;
  const companyHourLog = await CompanyHourLog.findOne({ _id: companyHourLogId })
    .populate('company', 'name')
    .populate('timeEntries', 'user publicUser company publicCompany publicHours publicDescription')
    .deepPopulate('timeEntries.user timeEntries.publicUser timeEntries.company timeEntries.publicCompany', err => {
      if (err) {
        console.log(err);
      }
    });
  res.json(companyHourLog);
};

exports.open = async (req, res) => {
  const { companyHourLogId } = req.params;

  const closingCompanyHourLog = await CompanyHourLog.findOne({ _id: companyHourLogId }).populate('timeEntries');
  const currentCompanyHourLog = await CompanyHourLog.findOne({ title: 'Current', company: closingCompanyHourLog.company }).populate('timeEntries');


  // If there's no current companyHourLog for this company, make this companyHourLog the new Current companyHourLog
  if (!currentCompanyHourLog) {
    closingCompanyHourLog.title = 'Current';
    closingCompanyHourLog.dateOpened = new Date();
    closingCompanyHourLog.dateClosed = new Date(0);
    await closingCompanyHourLog.save();
    return res.json(closingCompanyHourLog);
  }
  // If there is a Current companyHourLog, merge the timeEntries in this companyHourLog with the Current companyHourLog
  if (currentCompanyHourLog) {
    currentCompanyHourLog.totalPublicHours += closingCompanyHourLog.totalPublicHours;
    currentCompanyHourLog.totalHiddenHours += closingCompanyHourLog.totalHiddenHours;
    await currentCompanyHourLog.updateOne({ $addToSet: { timeEntries: closingCompanyHourLog.timeEntries } });

    for (let i = 0; i < closingCompanyHourLog.timeEntries.length; i++) {
      const timeEntryId = closingCompanyHourLog.timeEntries[i]._id;
      await TimeEntry.findOneAndUpdate({ _id: timeEntryId }, { companyHourLog: currentCompanyHourLog._id });
    }

    await closingCompanyHourLog.remove();
    await currentCompanyHourLog.save();
    return res.json(currentCompanyHourLog);
  }
};

exports.close = async (req, res) => {
  const { companyHourLogId } = req.params;
  const companyHourLog = await CompanyHourLog.findOne({ _id: companyHourLogId }).populate('timeEntries');

  // If closing an companyHourLog with submitted timeEntries, move the timeEntries to a new Current companyHourLog
  if (companyHourLog.totalSubmittedHours > 0) {
    const recievingHourLog = await (new CompanyHourLog({
      company: companyHourLog.company,
      dateClosed: new Date(0),
    })).save();
    let totalSubmittedHours = 0;
    for (let i = 0; i < companyHourLog.timeEntries.length; i++) {
      const timeEntry = companyHourLog.timeEntries[i];
      if (timeEntry.status === 'submitted') {
        totalSubmittedHours += timeEntry.publicHours;
        await recievingHourLog.update({ $addToSet: { timeEntries: timeEntry._id } });
        await companyHourLog.update({ $pull: { timeEntries: timeEntry._id } });
        await TimeEntry.findOneAndUpdate({ _id: timeEntry._id }, { companyHourLog: recievingHourLog._id });
      }
    }
    companyHourLog.totalSubmittedHours = 0;
    recievingHourLog.totalSubmittedHours = totalSubmittedHours;
    await recievingHourLog.save();
  }

  // Delete an companyHourLog if it's empty
  if (companyHourLog.totalPublicHours === 0 && companyHourLog.totalHiddenHours === 0 && companyHourLog.totalSubmittedHours === 0) {
    await companyHourLog.remove();
    return res.json({ redirectUrl: `/company/${companyHourLog.company._id}`, companyId: companyHourLog.company._id });
  }

  companyHourLog.title = req.body.title;
  companyHourLog.dateClosed = new Date();

  await companyHourLog.save();

  res.json(companyHourLog);
};

exports.edit = async (req, res) => {
  const { companyHourLogId } = req.params;
  const companyHourLog = await CompanyHourLog.findOneAndUpdate({ _id: companyHourLogId }, req.body, { new: true });
  res.json(companyHourLog);
};