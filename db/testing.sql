  
--   Getting the match based on the zip code
  select * from gitfit_db.profile b where home_zip = (SELECT home_zip FROM gitfit_db.profile where id = 6)
  and  id <> 6

-- updating the tables with matches
  update gitfit_db.profile set home_street =
"123 Falcon Landing"
where id = 20;
update gitfit_db.profile set home_street =
"123 Terrece Village"
where id = 17;
update gitfit_db.profile set home_street =
"2342 Tumble road"
where id = 8;
update gitfit_db.profile set home_city =
"Richmond", home_state = "VA", home_zip = "23228"
where id in (20, 17, 8);

