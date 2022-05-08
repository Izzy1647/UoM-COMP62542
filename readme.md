# COMP62542

Backend: https://github.com/gemarkq/comp62542-backend/tree/master

Try it: https://studentsys.netlify.app/

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

## Activity Enrollment表

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

## courses表

字段：

1. id
2. course id
3. course name
4. type ('opt' | 'course')
5. time
6. department
7. teacher

## course enrollment 表

字段：

1. id
2. Course id
3. Student id 



For a fully registered student, she/he will allow the student support office too add or remove some courses from her/his course list.

master账号登陆 10000

```
master token:
/enrollment
GET
{
	courseId: '',
	studentId: ''
}

POST / DELETE
{
	courseId: '',
	studentId: ''
}

if not: 
{
	
}
```







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
/user/login
POST
{
	studentID: string
}
```

返回：

token放在header里

```
return:
{
	"status": "success" | "fail"
	"user":user,
}
```
### update status

```
/status/update
POST
{
	status: 0
}
```
```
return:
{
	"status": 0 | 1
	"message": "",
}
```

### 时间表 5.5 联调

For a fully registered student, she/he can view her/his basic **timetable** and add additional activities such as tutorials and supervision meetings to the basic timetable. Assume the timetable is the same for every week, so that you only need to consider one week’s timetable.

```
/activities
GET
获取课程表
token 在header Authorization字段里

return: 
{
	data: [
		{
			activityName: '',
			type: 'course|optcourse|tutorial|meeting',
			time: '1-0900-1100'
		},
		{
			activityName: '',
			type: 'course|optcourse|tutorial|meeting',
			time: '2-0900-1100'
		},
	]
}


add additional activities such as tutorials and supervision meetings to the basic timetable.
POST
新建活动
{
	type: 'tutorial' | 'meeting',
	time: '1-0900-1100'
	activityName: ''
}

return :
{
	status: 0|1,
	message: ''
}

```



For a fully registered student, she/he can choose an optional course unit from a set of course units and the student can also opt-out a course unit from the optional course units. The optional courses are offered by Computer Science and Mathematics Departments.

```
/optcourses
GET
所有可选的课的列表
return 
{
	data: [
		{
				courseName: '',
				type: 'opt',
				time: '1-0900-1100',
				department: '',
				courseId: ''
		},
		{
		
		}
	]
}

POST
token都在header里
{
	courseId: ''
}

return
{
	status: 0|1,
	message: ''
}


DELETE
token都在header里
{
	courseId: ''
}

return
{
	status: 0|1,
	message: ''
}

```



## Newsletter 5.6

/subscribe

```
GET

return 
{
	data: [
		{
			newsletterId: '',
			newsletterName: '',
			preview: ''
		},
		{
		
		},
	]
}

POST
{
	newsletterId: ''
}
```

