package com.comp62542.studentsystem.service;

import com.comp62542.studentsystem.dao.UserMapper;
import com.comp62542.studentsystem.entity.User;
import com.comp62542.studentsystem.util.JWTUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

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

    public Map<String, Object> login(String studentId) {
        Map<String, Object> map = new HashMap<>();

        if(StringUtils.isBlank(studentId)) {
            map.put("studentIdMsg", "studnetId can not be empty!");
            return map;
        }
        User user = userMapper.selectByStudentId(studentId);

        // status：0 登入成功，status：1 登入成功
        if(user == null) {
            map.put("status", 0);
            map.put("user", user);
            return map;
        }

        // JWT token
        Map<String, String> payload = new HashMap<>();
        payload.put("studentId", user.getStudentID());
        payload.put("name", user.getName());
        String token = JWTUtils.getToken(payload);
        map.put("token", token);
        map.put("user", user);
        map.put("status", 1);
        return map;
    }
}
