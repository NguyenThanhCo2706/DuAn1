const Students = require('../models/Student')

const studentController = {
    getAllStudent: async (req, res) => {
        try {
            let students = await Students.find();
            if (students) {
                res.status(200).json(students);
            }
            else {
                res.status(500).json('No student found')
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    getStudent: async (req, res) => {
        try {
            id = req.query.id;
            if (id) {
                let student = await Students.findById({ _id: id });
                if (student) {
                    res.status(200).json(student);
                }
                else {
                    res.status(500).json('No student found')
                }
            }
            else {
                res.status(500).json('Student_id invalid')
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    createStudent: async (req, res) => {
        try {
            let name = req.body.name;
            let gender = req.body.gender;
            let birth = req.body.birth;
            let address = req.body.address;
            let avatar = req.body.avatar;
            if (name && gender && birth && avatar && address) {
                const newStudent = await Students({
                    name: name,
                    gender: gender,
                    birth: birth,
                    address: address,
                    avatar: avatar
                })
                const student = newStudent.save()
                console.log("create oke")
                res.status(200).json(student)
            }
            else {
                res.status(500).json('Input invalid')
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    updateStudent: async (req, res) => {
        try {
            let id = req.body.id
            let name = req.body.name;
            let gender = req.body.gender;
            let birth = req.body.birth;
            let address = req.body.address;
            let avatar = req.body.avatar;
            if (name && gender && birth && avatar && address) {
                let student = await Students.findById({
                    _id: id
                })
                student.name = name;
                student.birth = birth;
                student.address = address;
                student.avatar = avatar;
                student.gender = gender;
                student.save()
                res.status(200).json(student)
            }
            else {
                res.status(500).json('Input invalid')
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    deleteStudent: async (req, res) => {
        try {
            id = req.query.id;
            if (id) {
                let student = await Students.findById({ _id: id });
                if (student) {
                    student.delete()
                    res.status(200).json(student);
                }
                else {
                    res.status(500).json('No student found')
                }
            }
            else {
                res.status(500).json('Student_id invalid')
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
}

module.exports = studentController