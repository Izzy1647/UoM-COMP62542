package com.comp62542.studentsystem;

import com.comp62542.studentsystem.dao.UserMapper;
import com.comp62542.studentsystem.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ContextConfiguration(classes = StudentSystemApplication.class)
public class MapperTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void testSelectUserByStudentId() {
        User user = userMapper.selectByStudentId("10872364");
        System.out.println(user);
    }

    @Test
    public void testSelectUserById() {
        User user = userMapper.selectById(1);
        System.out.println(user);
    }
}
