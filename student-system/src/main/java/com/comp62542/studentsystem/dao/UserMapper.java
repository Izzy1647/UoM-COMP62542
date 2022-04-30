package com.comp62542.studentsystem.dao;

import com.comp62542.studentsystem.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {

    @Select({
            "select id, studentID, name, status, type " +
                    "from user " +
                    "where studentID=#{studetnID}"
    })
    User selectByStudentId(String studentID);


    @Select({
            "select id, studentID, name, status, type " +
                    "from user " +
                    "where id=#{id}"
    })
    User selectById(int id);
}
