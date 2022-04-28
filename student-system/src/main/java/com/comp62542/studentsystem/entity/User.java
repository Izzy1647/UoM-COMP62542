package com.comp62542.studentsystem.entity;

public class User {
    private int id;
    private String studentID;
    private String name;
    private int status;  // 0: not registered / 1: fully registered
    private String type; // student or admin

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStudentID() {
        return studentID;
    }

    public void setStudentID(String studentID) {
        this.studentID = studentID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", studentID='" + studentID + '\'' +
                ", name='" + name + '\'' +
                ", status=" + status +
                ", type='" + type + '\'' +
                '}';
    }
}
