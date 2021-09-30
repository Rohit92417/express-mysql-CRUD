CREATE TABLE `usermanagement`.`user` 
( `id` INT NOT NULL AUTO_INCREMENT , 
`name` VARCHAR(45) NOT NULL , `email` VARCHAR(45) NOT NULL , 
`password` VARCHAR(45) NOT NULL , `phone` INT(10) NOT NULL , 
`comments` TEXT NOT NULL , `status` VARCHAR(10) NOT NULL DEFAULT 
'active' , PRIMARY KEY (`id`)) ENGINE = InnoDB;