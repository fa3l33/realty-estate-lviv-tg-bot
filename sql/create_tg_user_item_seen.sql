-- mysql
-- table that holds seen items ids for each user
CREATE TABLE `tg_user_items_seen` (`user_id` int NOT NULL
                            , `item_id` int NOT NULL
                            , INDEX `IDX_ead5bd66452741a1f639ad9997` (`user_id`)
                            , INDEX `IDX_54dcd34ee20bf1ab4e1c1ee2cc` (`item_id`)
                            , PRIMARY KEY (`user_id`, `item_id`)) ENGINE=InnoDB