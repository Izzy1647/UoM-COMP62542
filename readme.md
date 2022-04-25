# COMP62542

Database-schema

## User表

1. student
2. admin

字段：

1. id
2. studentID
3. name
4. status （判断是否fully registered）
5. type (判断身份 student or admin）

## Enrollment表

字段：

1. id
2. studentid
3. activityid

## activities表 (course + tutorial + meeting)

字段：

1. id
2. activity id
3. student id
4. activity name
5. type (string-course, tutorial, meeting)
6. time

## subscription表 (订阅表)

字段：

1. id
2. newsletter id
3. student id

## newsletter表

字段：

1. id
2. newsletter id
3. content





## 接口文档

### 登录：

```
/login
POST
{
	studentID: string
}
```

返回：

```
return:
{
	"user":user,
	"token":token
}
```

