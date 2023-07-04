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

INSERT INTO `monolito`.`permissions` (`id_permission`, `name`) VALUES ('1', 'Admin');
INSERT INTO `monolito`.`permissions` (`id_permission`, `name`) VALUES ('2', 'User');
INSERT INTO `monolito`.`permissions` (`id_permission`, `name`) VALUES ('3', 'Guest');

INSERT INTO users (id_user, username, name, password) VALUES (1,'giusier','Giusier Ferreira','$2b$10$/reNdkdDPzie0fPBYyGEIe4AqeBC6JQI4Lr5NMhYd.sjD5clzjK3S'),(2,'teste','Teste Teste','$2b$10$ichSxgP5p3c/55E7VbZx4O/uTG3cl66heMG6Lc8dfBQ4jb2QZKx6.');

INSERT INTO boards (id_board, name, description, style) VALUES (1,'TCC','Quadro do projeto Kanban',NULL);

INSERT INTO boards_has_users (id_board, id_user, id_permission) VALUES (1,1,1);

INSERT INTO columns (id_column, `order`, name, show_swinlane, show_wip, wip_limit, style, id_board) VALUES (1,0,'Backlog','0','false',0,NULL,1),(2,1,'Rotina','false','false',0,NULL,1),(3,2,'Fazendo','true','true',10,NULL,1),(4,3,'Feito','false','false',0,NULL,1);
INSERT INTO `groups` (id_group, `order`, name, show_wip, wip_limit) VALUES (1,0,'Doing','false',NULL),(2,0,'Doing','false',NULL),(3,0,'Fazendo','false',NULL),(4,0,'Doing','false',NULL),(5,1,'Feito','false',NULL);
INSERT INTO columns_has_groups (id_column, id_group) VALUES (1,1),(2,2),(3,3),(3,5),(4,4);
INSERT INTO cards (id_card, `order`, description, name, creationDate, expectedDate, style, id_group, id_user, id_swinlane) VALUES (1,0,'null','Teste de API','2023-07-04 12:03:17','0000-00-00 00:00:00',NULL,2,1,NULL),(2,1,'null','Teste do Front-End','2023-07-04 12:14:34','0000-00-00 00:00:00',NULL,2,1,NULL),(3,10,'','Criação da contextualização','2023-07-04 12:55:06','0000-00-00 00:00:00',NULL,4,1,NULL),(4,9,'','Estudar Canvas de Proposta de Valor','2023-07-04 12:55:34','0000-00-00 00:00:00',NULL,4,1,NULL),(5,8,'','Criar base do software','2023-07-04 12:56:03','0000-00-00 00:00:00',NULL,4,1,NULL),(6,7,'','Criação do modal de configuração no quadro','2023-07-04 12:58:48','0000-00-00 00:00:00',NULL,4,1,NULL),(7,0,'','Gerenciamento de Raias','2023-07-04 12:59:31','0000-00-00 00:00:00',NULL,5,1,2),(8,5,'','Criar PPT','2023-07-04 13:00:50','0000-00-00 00:00:00',NULL,4,1,NULL),(9,1,'','Criar seção de comentários do card','2023-07-04 13:15:01','0000-00-00 00:00:00',NULL,5,1,1),(10,3,'null','Criar dashboard','2023-07-04 13:20:07','0000-00-00 00:00:00',NULL,4,1,NULL),(11,2,'null','Criar páginas de login e registro','2023-07-04 13:20:19','0000-00-00 00:00:00',NULL,4,1,NULL),(12,2,'','Conectar API com o Front-End','2023-07-04 13:20:36','0000-00-00 00:00:00',NULL,5,1,1),(13,0,'','Evoluir o projeto','2023-07-04 13:23:54','0000-00-00 00:00:00',NULL,1,NULL,NULL),(14,0,'','Atualizar documentação para o novo padrão','2023-07-04 13:38:09','0000-00-00 00:00:00',NULL,4,1,NULL);
INSERT INTO cards_has_tags (id_card, id_tag) VALUES (1,4),(2,5),(3,6),(4,6),(5,2),(5,4),(5,5),(6,4),(6,5),(7,4),(7,5),(8,2),(9,4),(9,5),(10,4),(10,5),(11,4),(11,5),(12,4),(12,5),(13,4),(13,5),(13,6),(14,6);

INSERT INTO swinlanes (id_swinlane, `order`, name, style, id_board) VALUES (1,0,'Priorizado','{\"color\": \"#d50d20\", \"textColor\": \"white\"}',1),(2,1,'Normal','{\"color\": \"#1686e8\", \"textColor\": \"white\"}',1);
INSERT INTO tags (id_tag, name, style, id_board) VALUES (1,'DESPRIORIZADO','{\"color\": \"#FFFFFF\", \"backgroundColor\": \"#b210c5\"}',1),(2,'PRIORIZADO','{\"color\": \"#FFFFFF\", \"backgroundColor\": \"#c81c1f\"}',1),(3,'AGUARDANDO HAYALA','{\"color\": \"#FFFFFF\", \"backgroundColor\": \"#04ac94\"}',1),(4,'API','{\"color\": \"#FFFFFF\", \"backgroundColor\": \"#820dec\"}',1),(5,'WEB','{\"color\": \"#FFFFFF\", \"backgroundColor\": \"#0cc8ea\"}',1),(6,'DOCUMENTACAO','{\"color\": \"#FFFFFF\", \"backgroundColor\": \"#f5a623\"}',1);



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
