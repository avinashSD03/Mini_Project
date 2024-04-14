create table users(
	u_id serial primary key,
	u_name varchar(30),
	u_usn varchar(14),
	u_sem int,
	u_dept varchar(4),
	u_pswd varchar(100)
);

create table uploads(
	up_id serial primary key,
	up_usn varchar(14),
	up_dept varchar(4),
	up_sem int,
	up_sub varchar(20),
	up_unit int,
	up_fileName varchar(255),
	up_mimeType varchar(255),
	up_other varchar(255),
	up_isvalid BOOLEAN
);

create table admins(
	a_id serial primary key,
	a_email varchar(30),
	a_pswd varchar(30)
);

select * from uploads up
inner join users u on
up.up_usn=u.u_usn;
-- select * from uploads,users
-- where uploads.up_usn=users.u_usn;