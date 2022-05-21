ALTER TABLE `ytiimcaa_db`.`tg_user` 
CHANGE COLUMN `chatId` `chatId` INT NOT NULL DEFAULT 0 ,
CHANGE COLUMN `propertyType` `propertyType` INT NOT NULL DEFAULT 0 ,
CHANGE COLUMN `roomType` `roomType` INT NOT NULL DEFAULT 0 ,
CHANGE COLUMN `districtType` `districtType` INT NOT NULL DEFAULT 0 ,
CHANGE COLUMN `priceType` `priceType` INT NOT NULL DEFAULT 0 ,
CHANGE COLUMN `apartmentPriceType` `apartmentPriceType` INT NOT NULL DEFAULT 0 ,
CHANGE COLUMN `menuStep` `menuStep` INT NOT NULL DEFAULT 0 ;
