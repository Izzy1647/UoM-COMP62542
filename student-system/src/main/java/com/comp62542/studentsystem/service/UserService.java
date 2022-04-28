package com.comp62542.studentsystem.service;

import com.comp62542.studentsystem.dao.UserMapper;
import com.comp62542.studentsystem.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public User findUserByStudentID(String StudentID) {
        return userMapper.selectByStudentId(StudentID);
    }

    public User findUserById(int id) {
        return userMapper.selectById(id);
    }
}
