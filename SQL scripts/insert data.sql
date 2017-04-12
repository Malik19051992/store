insert into CATEGORIES(PARENT_ID, NAME) values (null,'Одежда');
insert into CATEGORIES(PARENT_ID, NAME) values (1,'Куртки');
insert into CATEGORIES(PARENT_ID, NAME) values (1,'Штаны');
insert into CATEGORIES(PARENT_ID, NAME) values (2,'Ветровки');
insert into CATEGORIES(PARENT_ID, NAME) values (2,'Зимние куртки');
insert into CATEGORIES(PARENT_ID, NAME) values (3,'Джинсы');
insert into CATEGORIES(PARENT_ID, NAME) values (3,'Брюки');

insert into ATTRIBUTTIES(TYPE, NAME) values ('string','Размер');
insert into ATTRIBUTTIES(TYPE, NAME) values ('string','Материал');

insert into ATTRIBUTTIES_CATEGORIES(ATTRIBUTTE_ID, CATEGORIES_ID) values (2,1);
insert into ATTRIBUTTIES_CATEGORIES(ATTRIBUTTE_ID, CATEGORIES_ID) values (1,2);
insert into ATTRIBUTTIES_CATEGORIES(ATTRIBUTTE_ID, CATEGORIES_ID) values (1,6);
insert into ATTRIBUTTIES_CATEGORIES(ATTRIBUTTE_ID, CATEGORIES_ID) values (1,7);

