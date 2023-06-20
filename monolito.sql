-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema monolito
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `monolito` ;

-- -----------------------------------------------------
-- Schema monolito
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `monolito` DEFAULT CHARACTER SET utf8 ;
USE `monolito`;

-- -----------------------------------------------------
-- Table `monolito`.`boards`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `monolito`.`boards` ;

CREATE TABLE IF NOT EXISTS `monolito`.`boards` (
  `id_board` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` LONGTEXT NULL,
  `style` JSON NULL,
  PRIMARY KEY (`id_board`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `monolito`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `monolito`.`users` ;

CREATE TABLE IF NOT EXISTS `monolito`.`users` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `name` VARCHAR(125) NOT NULL,
  `password` VARCHAR(125) NOT NULL,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `username_UNIQUE` ON `monolito`.`users` (`username` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `monolito`.`permissions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `monolito`.`permissions` ;

CREATE TABLE IF NOT EXISTS `monolito`.`permissions` (
  `id_permission` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id_permission`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `monolito`.`boards_has_users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `monolito`.`boards_has_users` ;

CREATE TABLE IF NOT EXISTS `monolito`.`boards_has_users` (
  `id_board` INT NOT NULL,
  `id_user` INT NOT NULL,
  `id_permission` INT NOT NULL,
  PRIMARY KEY (`id_board`, `id_user`, `id_permission`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `monolito`.`columns`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `monolito`.`columns` ;

CREATE TABLE IF NOT EXISTS `monolito`.`columns` (
  `id_column` INT NOT NULL AUTO_INCREMENT,
  `order` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `show_swinlane` VARCHAR(10) NOT NULL DEFAULT false,
  `show_wip` VARCHAR(10) NOT NULL DEFAULT false,
  `wip_limit` INT NULL,
  `style` JSON NULL,
  `id_board` INT NOT NULL,
  PRIMARY KEY (`id_column`, `id_board`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `monolito`.`groups`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `monolito`.`groups` ;

CREATE TABLE IF NOT EXISTS `monolito`.`groups` (
  `id_group` INT NOT NULL AUTO_INCREMENT,
  `order` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `show_wip` VARCHAR(10) NOT NULL DEFAULT 'false',
  `wip_limit` VARCHAR(45) NULL,
  PRIMARY KEY (`id_group`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `monolito`.`columns_has_groups`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `monolito`.`columns_has_groups` ;

CREATE TABLE IF NOT EXISTS `monolito`.`columns_has_groups` (
  `id_column` INT NOT NULL,
  `id_group` INT NOT NULL,
  PRIMARY KEY (`id_column`, `id_group`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `monolito`.`swinlanes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `monolito`.`swinlanes` ;

CREATE TABLE IF NOT EXISTS `monolito`.`swinlanes` (
  `id_swinlane` INT NOT NULL AUTO_INCREMENT,
  `order` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `style` JSON NULL,
  `id_board` INT NOT NULL,
  PRIMARY KEY (`id_swinlane`, `id_board`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `monolito`.`cards`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `monolito`.`cards` ;

CREATE TABLE IF NOT EXISTS `monolito`.`cards` (
  `id_card` INT NOT NULL AUTO_INCREMENT,
  `order` INT NOT NULL,
  `description` LONGTEXT NULL,
  `name` VARCHAR(45) NOT NULL,
  `creationDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `expectedDate` DATETIME NULL,
  `style` JSON NULL,
  `id_group` INT NOT NULL,
  `id_user` INT NULL DEFAULT 1,
  `id_swinlane` INT NULL,
  PRIMARY KEY (`id_card`, `id_group`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `monolito`.`tags`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `monolito`.`tags` ;

CREATE TABLE IF NOT EXISTS `monolito`.`tags` (
  `id_tag` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `style` JSON NULL,
  `id_board` INT NOT NULL,
  PRIMARY KEY (`id_tag`, `id_board`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `monolito`.`cards_has_tags`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `monolito`.`cards_has_tags` ;

CREATE TABLE IF NOT EXISTS `monolito`.`cards_has_tags` (
  `id_card` INT NOT NULL,
  `id_tag` INT NOT NULL,
  PRIMARY KEY (`id_card`, `id_tag`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `monolito`.`comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `monolito`.`comments` ;

CREATE TABLE IF NOT EXISTS `monolito`.`comments` (
  `id_comment` INT NOT NULL AUTO_INCREMENT,
  `message` LONGTEXT NOT NULL,
  `createdDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  `id_user` INT NOT NULL,
  `id_card` INT NOT NULL,
  PRIMARY KEY (`id_comment`))
ENGINE = InnoDB;

SET SQL_SAFE_UPDATES = 0;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

--
-- SELECTS
--

SELECT * FROM users;

--
-- INSERTS
--

INSERT INTO `monolito`.`boards` (`id_board`, `name`) VALUES ('1', 'TCC');
INSERT INTO `monolito`.`boards` (`id_board`, `name`) VALUES ('2', 'Tester');


INSERT INTO `monolito`.`users` (`id_user`, `username`, `name`, `password`) VALUES ('1', 'Unassigned', 'Sem dono', '');
INSERT INTO `monolito`.`users` (`id_user`, `username`, `name`, `password`) VALUES ('2', 'admin', 'admin', '$2b$10$yJU2NBrPJcYSFpP.nsOoj.5kxA8TetS4WB24V6ZUPN12KGc.q/Kla');


INSERT INTO `monolito`.`permissions` (`id_permission`, `name`) VALUES ('1', 'Admin');
INSERT INTO `monolito`.`permissions` (`id_permission`, `name`) VALUES ('2', 'User');
INSERT INTO `monolito`.`permissions` (`id_permission`, `name`) VALUES ('3', 'Guest');


INSERT INTO `monolito`.`boards_has_users` (`id_board`, `id_user`, `id_permission`) VALUES ('1', '2', '1');
INSERT INTO `monolito`.`boards_has_users` (`id_board`, `id_user`, `id_permission`) VALUES ('2', '2', '2');


INSERT INTO `monolito`.`columns` (`id_column`, `order`, `name`, `show_swinlane`, `id_board`) VALUES ('1', '0', 'To-Do', 'false', '1');
INSERT INTO `monolito`.`columns` (`id_column`, `order`, `name`, `show_swinlane`, `id_board`) VALUES ('2', '1', 'Doing', 'true', '1');
INSERT INTO `monolito`.`columns` (`id_column`, `order`, `name`, `show_swinlane`, `id_board`) VALUES ('3', '2', 'Done', 'false', '1');


INSERT INTO `monolito`.`groups` (`id_group`, `order`, `name`) VALUES ('1', '0', 'Doing');
INSERT INTO `monolito`.`groups` (`id_group`, `order`, `name`) VALUES ('2', '0', 'Doing');
INSERT INTO `monolito`.`groups` (`id_group`, `order`, `name`) VALUES ('3', '1', 'Done');
INSERT INTO `monolito`.`groups` (`id_group`, `order`, `name`) VALUES ('4', '0', 'Doing');


INSERT INTO `monolito`.`columns_has_groups` (`id_column`, `id_group`) VALUES ('1', '1');
INSERT INTO `monolito`.`columns_has_groups` (`id_column`, `id_group`) VALUES ('2', '3');
INSERT INTO `monolito`.`columns_has_groups` (`id_column`, `id_group`) VALUES ('2', '2');
INSERT INTO `monolito`.`columns_has_groups` (`id_column`, `id_group`) VALUES ('3', '4');

INSERT INTO `monolito`.`cards` (`id_card`, `order`, `name`, `description`, `id_group`, `id_user`) VALUES ('1', '0', 'Criar banco de dados do projeto', 'Nenhuma...', '2', '1');
INSERT INTO `monolito`.`cards` (`id_card`, `order`, `name`, `id_group`, `id_user`) VALUES ('2', '0', 'Criar API do projeto', '1', '1');
INSERT INTO `monolito`.`cards` (`id_card`, `order`, `name`, `description`, `id_group`, `id_user`) VALUES ('3', '1', 'Conectar back-end com front-end', 'fazer isso após a criação do banco de dados / api', '1', '1');

INSERT INTO `monolito`.`tags` (`id_tag`, `name`, `id_board`) VALUES ('1', 'Test', '1');
INSERT INTO `monolito`.`tags` (`id_tag`, `name`, `id_board`) VALUES ('2', 'Pra ontem', '1');
INSERT INTO `monolito`.`tags` (`id_tag`, `name`, `id_board`) VALUES ('3', 'Pra hoje', '1');

INSERT INTO `monolito`.`cards_has_tags` (`id_card`, `id_tag`) VALUES ('1', '1');
INSERT INTO `monolito`.`cards_has_tags` (`id_card`, `id_tag`) VALUES ('1', '2');
INSERT INTO `monolito`.`cards_has_tags` (`id_card`, `id_tag`) VALUES ('2', '1');
INSERT INTO `monolito`.`cards_has_tags` (`id_card`, `id_tag`) VALUES ('3', '1');

INSERT INTO `monolito`.`swinlanes` (`id_swinlane`, `order`, `name`, `id_board`) VALUES ('1', '0', 'Expedite', '1');
INSERT INTO `monolito`.`swinlanes` (`id_swinlane`, `order`, `name`, `id_board`) VALUES ('2', '1', 'Flow', '1');

INSERT INTO `monolito`.`comments` (`id_comment`, `message`, `id_user`, `id_card`) VALUES ('1', 'Teste ', '2', '18');
INSERT INTO `monolito`.`comments` (`id_comment`, `message`, `id_user`, `id_card`) VALUES ('2', 'Testado', '3', '18');
INSERT INTO `monolito`.`comments` (`id_comment`, `message`, `id_user`, `id_card`) VALUES ('3', 'Ok', '2', '18');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
