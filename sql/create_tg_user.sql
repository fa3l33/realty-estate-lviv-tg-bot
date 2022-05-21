-- mysql
CREATE TABLE `tg_user` (`id` int NOT NULL
                        , `isBot` tinyint NOT NULL
                        , `firstName` varchar(255) NOT NULL
                        , `lastName` varchar(255) NULL
                        , `username` varchar(255) NOT NULL
                        , `phoneNumber` varchar(255) NULL
                        , `chatId` int NOT NULL
                        , `propertyType` int NOT NULL
                        , `roomType` int NOT NULL
                        , `districtType` int NOT NULL
                        , `priceType` int NOT NULL
                        , `apartmentPriceType` int NOT NULL
                        , `menuStep` int NOT NULL
                        , `isActive` tinyint NOT NULL
                        , `startTS` datetime NOT NULL
                        , `lastUpdateTS` datetime NOT NULL
                        , `notifiedAtTS` datetime NULL
                        , `interestedInItemId` int NULL
                        , PRIMARY KEY (`id`)) ENGINE=InnoDB