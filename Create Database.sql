
drop database pharmacy;
create database pharmacy;
use pharmacy;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
flush privileges;
create table system_user (
	phone			varchar(12),
    firstname		varchar(255),
    lastname		varchar(255),
    dateofbirth		date,
    address			varchar(255),
    email			varchar(255),
    pwd             varchar(10),
    
    primary key (phone)
);

create table patient(
	phone				varchar(12),
    medical_history		varchar(255),
    height				int,
    weight				float,
    blood_type			varchar(2)		check (blood_type = "A" or blood_type = "B" or blood_type = "AB" or blood_type = "O"),
    medical_background	varchar(255),
    
    primary key (phone),
    foreign key (phone) references system_user(phone)
);

create table doctor(
	phone				varchar(12),
    specialism			varchar(255),
    experience_year		int				check (experience_year >= 0),
    
    primary key (phone),
    foreign key (phone) references system_user(phone)
);

create table nurse(
	phone		varchar(12),
    job_title	varchar(255),
    
    primary key (phone),
    foreign key (phone) references system_user(phone)
);

create table work_schedule(
	doctor_phone	varchar(12),
    work_day		int				check (work_day >= 2 and work_day <= 8),
    work_session	char			check (work_session = "S" or work_session = "C"),
    
    primary key (doctor_phone, work_day),
    foreign key (doctor_phone) references doctor(phone)
);

create table treatment_turn(
	id				varchar(12),
    turn_time		time,
    health_issue		varchar(255),
    blood_pressure	int				check (blood_pressure > 0),
    heart_beat	int				check (heart_beat > 0),
    therapy			varchar(255),
    diagnose		varchar(255),
    start_time		time,
    end_time		time,
    patient_phone	varchar(12)		not null,
    doctor_phone	varchar(12)		not null,
    
    check (start_time < end_time),
    check (turn_time <= start_time),
    
    primary key (id),
    foreign key (patient_phone) references patient(phone),
    foreign key (doctor_phone) references doctor(phone)
);

create table medicine(
	id				varchar(12),
    created_date	date,
    
    primary key (id)
);

create table prescriptive_medicine(
	prescribe_id	varchar(12),
	treatment_id	varchar(12)		not null,
    
    primary key (prescribe_id),
    foreign key (prescribe_id) references medicine(id),
    foreign key (treatment_id) references treatment_turn(id)
);

create table purchase_medicine(
	purchase_id		varchar(12),
	patient_phone	varchar(12)		not null,
    
    primary key (purchase_id),
    foreign key (purchase_id) references medicine(id),
    foreign key (patient_phone) references patient(phone)
);

create table drug(
	drug_name		varchar(255),
    price		int				check (price > 0),
    ingredient	varchar(255),
    drug_usage	varchar(255),
    state		int,
    
    primary key (drug_name)
);

create table payment(
	id				varchar(12),
    method			varchar(255),
    created_date	date,
    nurse_phone		varchar(12),
    medicine_id		varchar(12)		not null,
    
    primary key (id),
    foreign key (nurse_phone) references nurse(phone),
    foreign key (medicine_id) references medicine(id)
);

create table include(
	medicine_id		varchar(12)		not null,
    drug_name		varchar(255)	not null,
    quantity		int				check (quantity > 0),
    
    primary key (medicine_id, drug_name),
    foreign key (medicine_id) references medicine(id),
    foreign key (drug_name) references drug(drug_name)
);