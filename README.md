import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as XLSX from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.join(__dirname, 'data.json');

const defaultData = {
  properties: [
    {
      id: 'prop-1',
      name: 'Oakview Residence',
      address: '12 Oak Road, Sandton',
      archived: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'prop-2',
      name: 'Maple Terrace',
      address: '77 Maple Lane, Rosebank',
      archived: false,
      createdAt: new Date().toISOString(),
    },
  ],
  people: [
    {
      id: 'person-1',
      name: 'Ava Smith',
      company: 'Smith & Co Realty',
      archived: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'person-2',
      name: 'Lerato Mokoena',
      company: 'Urban Homes',
      archived: false,
      createdAt: new Date().toISOString(),
    },
  ],
  keys: [
    {
      id: 'key-1',
      keyTag: 'K-001',
      serialNumber: 'SN-201',
      propertyId: 'prop-1',
      currentHolderId: 'person-1',
      status: 'in-use',
      archived: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'key-2',
      keyTag: 'K-002',
      serialNumber: 'SN-202',
      propertyId: 'prop-1',
      currentHolderId: null,
      status: 'available',
      archived: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'key-3',
      keyTag: 'K-003',
      serialNumber: 'SN-203',
      propertyId: 'prop-2',
      currentHolderId: 'person-2',
      status: 'in-use',
      archived: false,
      createdAt: new Date().toISOString(),
    },
  ],
  activities: [
    {
      id: 'activity-1',
      title: 'Ava Smith checked out Oakview Residence key K-001',
      notes: 'Allocated to sales agent for viewing access.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'activity-2',
      title: 'Lerato Mokoena checked out Maple Terrace key K-003',
      notes: 'Key assigned for tenant handover.',
      createdAt: new Date().toISOString(),
    },
  ],
};

const ensureDataFile = () => {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify(defaultData, null, 2));
  }
};

const readData = () => {
  ensureDataFile();
  const raw = fs.readFileSync(dataFile, 'utf8');
  return JSON.parse(raw);
};

const saveData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

const createActivity = (data, title, notes = '') => {
  data.activities.unshift({
    id: `activity-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    title,
    notes,
    createdAt: new Date().toISOString(),
  });
};

const getPersonName = (people, id) => {
  if (!id) return 'Not assigned';
  const person = people.find((item) => item.id === id);
  return person ? person.name : 'Unknown person';
};

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/overview', (_req, res) => {
  const data = readData();
  res.json(data);
});

app.get('/api/properties', (_req, res) => {
  const data = readData();
  res.json(data.properties);
});

app.post('/api/properties', (req, res) => {
  const data = readData();
  const { name, address } = req.body;

  if (!name || !address) {
    return res.status(400).json({ message: 'Property name and address are required.' });
  }

  const property = {
    id: `prop-${Date.now()}`,
    name,
    address,
    archived: false,
    createdAt: new Date().toISOString(),
  };

  data.properties.unshift(property);
  saveData(data);
  createActivity(data, `Property added: ${name}`, address);
  saveData(data);
  return res.status(201).json(property);
});

app.patch('/api/properties/:id/archive', (req, res) => {
  const data = readData();
  const property = data.properties.find((item) => item.id === req.params.id);

  if (!property) {
    return res.status(404).json({ message: 'Property not found' });
  }

  property.archived = true;
  createActivity(data, `Property archived: ${property.name}`, 'Archived due to change in status or sale.');
  saveData(data);
  return res.json(property);
});

app.get('/api/people', (_req, res) => {
  const data = readData();
  res.json(data.people);
});

app.post('/api/people', (req, res) => {
  const data = readData();
  const { name, company } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Person name is required.' });
  }

  const person = {
    id: `person-${Date.now()}`,
    name,
    company: company || '',
    archived: false,
    createdAt: new Date().toISOString(),
  };

  data.people.unshift(person);
  createActivity(data, `Person added: ${name}`, company ? `${company} company record created.` : 'No company entered.');
  saveData(data);
  return res.status(201).json(person);
});

app.patch('/api/people/:id/archive', (req, res) => {
  const data = readData();
  const person = data.people.find((item) => item.id === req.params.id);

  if (!person) {
    return res.status(404).json({ message: 'Person not found' });
  }

  person.archived = true;
  createActivity(data, `Person archived: ${person.name}`, 'Archived while preserving their checkin and checkout history.');
  saveData(data);
  return res.json(person);
});

app.delete('/api/people/:id', (req, res) => {
  const data = readData();
  const index = data.people.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Person not found' });
  }

  const [person] = data.people.splice(index, 1);
  createActivity(data, `Person deleted: ${person.name}`, 'Removed from active records while preserving action history.');
  saveData(data);
  return res.json({ message: 'Person deleted' });
});

app.get('/api/keys', (_req, res) => {
  const data = readData();
  res.json(data.keys);
});

app.post('/api/keys', (req, res) => {
  const data = readData();
  const { keyTag, serialNumber, propertyId } = req.body;

  if (!keyTag || !serialNumber || !propertyId) {
    return res.status(400).json({ message: 'Key tag, serial number, and property are required.' });
  }

  const key = {
    id: `key-${Date.now()}`,
    keyTag,
    serialNumber,
    propertyId,
    currentHolderId: null,
    status: 'available',
    archived: false,
    createdAt: new Date().toISOString(),
  };

  data.keys.unshift(key);
  createActivity(data, `Key captured: ${keyTag}`, `Property: ${propertyId}`);
  saveData(data);
  return res.status(201).json(key);
});

app.post('/api/keys/:id/checkout', (req, res) => {
  const data = readData();
  const { personId, notes = '' } = req.body;
  const keyIndex = data.keys.findIndex((item) => item.id === req.params.id);
  const person = data.people.find((item) => item.id === personId);

  if (keyIndex === -1) {
    return res.status(404).json({ message: 'Key not found' });
  }

  if (!person) {
    return res.status(400).json({ message: 'Valid person is required' });
  }

  const key = data.keys[keyIndex];
  key.currentHolderId = person.id;
  key.status = 'in-use';

  const property = data.properties.find((item) => item.id === key.propertyId);
  createActivity(
    data,
    `${person.name} checked out ${key.keyTag}`,
    `${property ? property.name : 'Property'} • ${notes || 'No notes attached.'}`
  );

  saveData(data);
  return res.json(key);
});

app.post('/api/keys/:id/checkin', (req, res) => {
  const data = readData();
  const keyIndex = data.keys.findIndex((item) => item.id === req.params.id);

  if (keyIndex === -1) {
    return res.status(404).json({ message: 'Key not found' });
  }

  const key = data.keys[keyIndex];
  const holder = getPersonName(data.people, key.currentHolderId);
  key.currentHolderId = null;
  key.status = 'available';
  createActivity(data, `${key.keyTag} checked in`, `${holder} returned the property key.`);
  saveData(data);
  return res.json(key);
});

app.get('/api/reports/full-keys', (_req, res) => {
  const data = readData();
  const rows = data.keys.map((key) => {
    const property = data.properties.find((item) => item.id === key.propertyId);
    const person = data.people.find((item) => item.id === key.currentHolderId);
    return {
      'Key Tag': key.keyTag,
      'Serial Number': key.serialNumber,
      Property: property ? property.name : 'Unknown property',
      Address: property ? property.address : 'N/A',
      'Current Holder': person ? person.name : 'Available',
      'Company': person ? person.company || 'N/A' : 'N/A',
      Status: key.status,
      'Archived': key.archived ? 'Yes' : 'No',
      'Created At': key.createdAt,
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Full Keys Report');
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="full-keys-report.xlsx"');
  res.send(buffer);
});

app.get('/api/reports/daily', (req, res) => {
  const data = readData();
  const date = req.query.date || new Date().toISOString().slice(0, 10);

  const dayActivities = data.activities.filter((activity) => {
    return new Date(activity.createdAt).toISOString().slice(0, 10) === date;
  });

  const rows = dayActivities.map((activity) => ({
    Date: activity.createdAt,
    Title: activity.title,
    Notes: activity.notes,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Daily Activity');
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="daily-activity-${date}.xlsx"`);
  res.send(buffer);
});

app.listen(PORT, () => {
  console.log(`Key-point server is running on http://localhost:${PORT}`);
});
