create table CATEGORIES(
ID serial not null PRIMARY KEY,
PARENT_ID int,
NAME varchar(255) not null
)

create table ATTRIBUTTIES(
ID serial not null PRIMARY KEY,
TYPE varchar(255) not null,
NAME varchar(255) not null
)

create table ATTRIBUTTIES_CATEGORIES(
ATTRIBUTTE_ID int not null REFERENCES ATTRIBUTTIES(ID),
CATEGORIES_ID int not null REFERENCES CATEGORIES(ID),
)

create table GOODS(
ID int not null PRIMARY KEY IDENTITY(1,1),
CATEGORY_ID int not null FOREIGN KEY REFERENCES CATEGORIES(ID),
NAME nvarchar(255) not null,
PRICE float not null,
UNIT_OF_CALCULATION nvarchar(255) not null
)

create table ATTRIBUTTIES_GOODS(
ATTRIBUTTE_ID int not null FOREIGN KEY REFERENCES ATTRIBUTTIES(ID),
GOODS_ID int not null FOREIGN KEY REFERENCES GOODS(ID),
VALUE nvarchar(255) not null
)

