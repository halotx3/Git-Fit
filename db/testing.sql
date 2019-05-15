  
--   Getting the match based on the zip code
  select * from gitfit_db.profile b where home_zip = (SELECT home_zip FROM gitfit_db.profile where id = 6)
  and  id <> 6