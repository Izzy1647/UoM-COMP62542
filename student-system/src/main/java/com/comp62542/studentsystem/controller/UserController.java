package com.comp62542.studentsystem.controller;

import com.comp62542.studentsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailParseException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public Map<String, Object> login(String studentId, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();
        Map<String, Object> loginMap = userService.login(studentId);
        map.put("status", loginMap.get("status"));
        map.put("user", loginMap.get("user"));
        if(loginMap.containsKey("token")) {
            response.addHeader("token", (String) loginMap.get("token"));
        }
        return map;
    }

}
