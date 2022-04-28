package com.comp62542.studentsystem.dao;

import com.comp62542.studentsystem.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    User selectByStudentId(String studentId);

    User selectById(int id);
}
