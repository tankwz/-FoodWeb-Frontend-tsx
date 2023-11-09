

select s.id as userID, s.name, r.id as RoleId, r.name from AspNetUsers as s, AspNetRoles as r, AspNetUserRoles as c where c.UserId = s.Id and c.RoleId = r.id