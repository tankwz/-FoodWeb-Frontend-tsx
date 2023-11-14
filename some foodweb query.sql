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

--sec2 sql zoom select from world
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
SELECT name, capital
from world
where left(name,1) = left(capital,1) AND name <> capital
--13
SELECT name
FROM world
WHERE name LIKE '%[aeiou]%'
  AND name NOT LIKE '% %';
--sec3 sql zoom select from nobel
--1
SELECT yr, subject, winner
  FROM nobel
 WHERE yr = 1950
--2
SELECT winner
  FROM nobel
 WHERE yr = 1962
   AND subject = 'literature'
--3
select yr, subject 
from nobel 
where winner = 'Albert Einstein'
--4
select winner
from nobel
where subject = 'peace' and yr >= 2000
--5
select * 
from nobel 
where subject = 'literature' and yr <= 1989 and  1980 <= yr
--6
SELECT * FROM nobel

  where winner IN ('Theodore Roosevelt',
                  'Thomas Woodrow Wilson',
                  'Jimmy Carter','Barack Obama')
--7
select winner 
from nobel 
where winner like 'John%'
--8
select yr, subject, winner 
from nobel
where (subject = 'physics' and yr = 1980) 
OR (subject = 'chemistry' and yr = 1984)
--9
select yr, subject, winner 
from nobel
where yr = 1980 and (subject != 'chemistry' and subject !=  'medicine')
--10
select yr, subject, winner 
from nobel
where (subject = 'Medicine' and yr <1910) or
(subject = 'Literature' and yr >= 2004)
--11
select * 
from nobel 
where winner = 'PETER GRÜNBERG'
--12
select * 
from nobel 
where winner = "EUGENE O'NEILL"
--13
select winner, yr, subject
from nobel
where winner like 'Sir%'
order by yr desc, winner
--14
SELECT winner, subject
  FROM nobel
 WHERE yr=1984
 ORDER BY subject IN ('physics','chemistry') asc, subject,winner
--sec3 sql zoom select from select
--1
SELECT name FROM world
  WHERE population >
     (SELECT population FROM world
      WHERE name='Russia')
--2
select name 
from world
where continent = 'Europe' 
and gdp/population > 
(select gdp/population 
from world 
where name = 'United Kingdom')
--3
select name, continent 
from world
where continent in 
(select continent 
from world 
where name = 'Argentina ' 
or name = 'Australia')
--4
select name, population
from world 
where population 
between 
(select population 
from world 
where name = 'United Kingdom') 
and 
(select population 
from world 
where name = 'Germany')
and name not in ('United Kingdom', 'Germany')
--5
select name, 
CONCAT(ROUND
  (population/
    (select population
        from world
          where name = 'Germany')
          *100), '%') as percentage
from world 
where continent = 'Europe'
--6
select name
from world
where gdp >= 
(select max(gdp) 
from world 
where continent = 'Europe') 
and name not in 
(select name 
from world 
where continent = 'Europe')
--7
SELECT continent, name, area
FROM world x
  WHERE area >= ALL
    (SELECT area FROM world y
        WHERE y.continent=x.continent
          AND population>0)
--8
select continent, name
from world
group by continent
order by name asc
--9
SELECT continent
FROM world
GROUP BY continent
HAVING MAX(population) <= 25000000;
--10
select c.name, c.continent
from world c
where c.population >
3* (         SELECT
            MAX(n.population)
        FROM
            world n
        WHERE
            n.continent = c.continent
            AND n.name <> c.name )