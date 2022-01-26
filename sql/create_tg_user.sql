-- mysql
CREATE TABLE `tg_user` (`id` int NOT NULL
                        , `isBot` tinyint NOT NULL
                        , `firstName` varchar(255) NOT NULL
                        , `lastName` varchar(255) NULL
                        , `username` varchar(255) NOT NULL
                        , `phoneNumber` varchar(255) NULL
                        , `chatId` int NOT NULL
                        , `propertyType` smallint NOT NULL
                        , `roomType` smallint NOT NULL
                        , `districtType` smallint NOT NULL
                        , `priceType` smallint NOT NULL
                        , `apartmentPriceType` smallint NOT NULL
                        , `menuStep` smallint NOT NULL
                        , `isActive` tinyint NOT NULL
                        , `startTS` datetime NOT NULL
                        , `lastUpdateTS` datetime NOT NULL
                        , `notifiedAtTS` datetime NULL
                        , `interestedInItemId` int NULL
                        , PRIMARY KEY (`id`)) ENGINE=InnoDB