--get id + name + role
select s.id as userID, s.name, r.id as RoleId, r.name from AspNetUsers as s, AspNetRoles as r, AspNetUserRoles as c 
where c.UserId = s.Id and c.RoleId = r.id

SELECT name
FROM menuitems
WHERE name COLLATE Latin1_General_CI_AI LIKE 'ba%';

select *  from  orderhead h join orderdetails  dt  on 
dt.orderheadid = h.orderheadid

SELECT h.orderheadid, SUM(dt.quantity * dt.price) as total, h.ordertotal, h.PickupName
FROM orderhead h
JOIN orderdetails dt ON dt.orderheadid = h.orderheadid
GROUP BY h.orderheadid, h.ordertotal,  h.PickupName;

--sec3 sql zoo
--3
select name, GDP/population as percapitaGDP
from world
where population >= 200000000
--4
select name, population/1000000 
from world 
where continent = 'South America' 
--5
select name, population 
from world 
where name in ('France','Germany','Italy')
--6
select name 
from world 
where name like "%United%"
--7
select name, population, area 
from world 
where area > 3000000 or population > 250000000
--8
select name, population, area 
from world 
where population >250000000 XOR area > 3000000
--9
select name, ROUND(population/1000000,2) 
as population_m, ROUND(GDP/1000000000,2) as GDP_b 
from world 
where continent = 'South America'

--10
SELECT name, ROUND(gdp/population, -3) AS rounded_value
FROM world
WHERE gdp > 1000000000000;
--11
SELECT name, capital
FROM world
WHERE LENGTH(name) = LENGTH(capital) 
--12
