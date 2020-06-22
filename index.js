const express = require('express');
const app = express();
const students = require('./students.json');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/students', (req, res) => {
  let search = req.query.search;

  if (search === undefined) {
    res.send(students);
  } else {
    let filteredStudents = students.filter((student) =>
      student.name.includes(search)
    );
    res.send(filteredStudents);
  }
});

app.get('/students/:studentId', (req, res) => {
  let id = Number(req.params.studentId);

  students.forEach((student) => {
    if (student.studentId === id) {
      res.send(student);
    }
  });
});

app.get('/grades/:studentId', (req, res) => {
  let id = Number(req.params.studentId);

  students.forEach((student) => {
    if (student.studentId === id) {
      res.send(student.grades);
    }
  });
});

app.post('/grades', (req, res) => {
  let studentId = Number(req.body.studentId);
  let grade = Number(req.body.grade);

  let result;

  if (grade) {
    students.forEach((student) => {
      if (student.studentId === studentId) {
        result = {
          status: 'successful',
          message: `${grade} successfully added`,
        };
      }
    });
  } else {
    result = {
      status: 'failed',
      message: `${grade} could not be added`,
    };
  }
  res.send(result);
});

app.post('/register', (req, res) => {
  let student = req.body;

  if (student.studentId && student.name && student.grades) {
    students.push({
      id: student.studentId,
      name: student.name,
      grades: student.grades,
    });
    result = {
      status: 'successful',
      message: `Student ID ${student.studentId} registered`,
    };
  } else {
    result = {
      status: 'failed',
      message: `Student ID ${student.studentId} could not be added`,
    };
  }

  res.send(result);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
