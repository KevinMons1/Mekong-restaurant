-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le : ven. 20 août 2021 à 10:35
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mekongjambe`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `adminId` int(11) NOT NULL AUTO_INCREMENT,
  `password` text NOT NULL,
  PRIMARY KEY (`adminId`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`adminId`, `password`) VALUES
(2, '$2a$10$nOlBGKU6NlI1QmyZuOS93uJaMd7MjmT8RdhKcYszahasteK7J3.a2');

-- --------------------------------------------------------

--
-- Structure de la table `categorys`
--

DROP TABLE IF EXISTS `categorys`;
CREATE TABLE IF NOT EXISTS `categorys` (
  `categoryId` int(11) NOT NULL AUTO_INCREMENT,
  `categoryNameId` int(11) NOT NULL,
  `platId` int(11) NOT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=MyISAM AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categorys`
--

INSERT INTO `categorys` (`categoryId`, `categoryNameId`, `platId`) VALUES
(57, 7, 39),
(56, 8, 39),
(52, 9, 38),
(51, 3, 37),
(55, 1, 36);

-- --------------------------------------------------------

--
-- Structure de la table `categorysname`
--

DROP TABLE IF EXISTS `categorysname`;
CREATE TABLE IF NOT EXISTS `categorysname` (
  `categoryNameId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`categoryNameId`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categorysname`
--

INSERT INTO `categorysname` (`categoryNameId`, `name`) VALUES
(1, 'soupes'),
(2, 'salades'),
(3, 'entrées chaudes'),
(4, 'soupes de nouilles'),
(5, 'plats au curry'),
(6, 'les spécialités'),
(7, 'wok'),
(8, 'végétarien'),
(9, 'desserts');

-- --------------------------------------------------------

--
-- Structure de la table `clientorder`
--

DROP TABLE IF EXISTS `clientorder`;
CREATE TABLE IF NOT EXISTS `clientorder` (
  `clientOrderId` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  PRIMARY KEY (`clientOrderId`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `clientorder`
--

INSERT INTO `clientorder` (`clientOrderId`, `clientId`, `orderId`) VALUES
(12, 13, 14),
(4, 5, 5),
(10, 11, 12),
(11, 12, 13),
(7, 8, 8),
(8, 9, 9),
(13, 14, 15),
(14, 15, 16),
(15, 16, 17),
(24, 25, 26),
(17, 18, 19),
(18, 19, 20),
(19, 20, 21),
(20, 21, 22),
(21, 22, 23),
(22, 23, 24),
(23, 24, 25),
(25, 26, 27),
(26, 27, 28),
(27, 28, 29),
(28, 29, 30),
(29, 30, 31),
(30, 31, 32),
(31, 32, 33),
(32, 33, 34),
(33, 34, 35);

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `clientId` int(11) NOT NULL AUTO_INCREMENT,
  `lastName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `hourPaid` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hourDeliver` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `numStreet` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `postalCode` int(11) NOT NULL,
  `box` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text,
  PRIMARY KEY (`clientId`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`clientId`, `lastName`, `firstName`, `hourPaid`, `hourDeliver`, `street`, `numStreet`, `city`, `postalCode`, `box`, `phone`, `email`, `message`) VALUES
(13, 'Monsieur', 'Kévin', '2021-07-25 15:47:50', '12h00', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(5, 'Pont', 'William', '2021-07-23 06:05:28', '13h30', '24 rue de l\'Ange', '24', 'Namur', 5380, '0003', 555555555, 'jsp@gmail.com', ''),
(11, 'Monsieur', 'Kévin', '2021-07-25 07:11:49', '12h00', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(12, 'Monsieur', 'Kévin', '2021-07-25 15:45:55', '12h30', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(8, 'sfq', 'qsfqsf', '2021-07-23 07:00:38', '13h00', '24 rue de l\'Ange', '55', 'Namur', 5380, '0003', 555555555, 'jsp@gmail.com', ''),
(9, 'Monsieur', 'Kévin', '2021-07-23 07:08:01', '12h30', '6 rue de Narmont', '22', 'Pontillas', 5380, '0002', 47471274, 'kevin.monsieur01@gmail.com', ''),
(14, 'Monsieur', 'Kévin', '2021-07-25 15:50:19', '12h30', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(15, 'Monsieur', 'Kévin', '2021-07-25 15:51:29', '12h30', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(16, 'Monsieur', 'Kévin', '2021-07-25 15:57:10', '13h00', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(25, 'Monsieur', 'Kévin', '2021-08-03 07:34:48', '12h00', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(18, 'Monsieur', 'Kévin', '2021-07-27 14:49:23', '12h00', '6 rue de Narmont', '55', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(19, 'Monsieur', 'Kévin', '2021-07-27 14:51:14', '12h30', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(20, 'Monsieur', 'Kévin', '2021-07-27 14:52:01', '12h30', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(21, 'Monsieur', 'Kévin', '2021-07-27 14:53:52', '12h30', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(22, 'Pont', 'William', '2021-07-27 14:55:07', '12h30', '24 rue de l\'Ange', '2', 'Namur', 5380, '2', 555555555, 'jsp@gmail.com', ''),
(23, 'Monsieur', 'Kévin', '2021-07-28 05:24:41', '12h00', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(24, 'Monsieur', 'Kévin', '2021-07-28 05:25:34', '12h00', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(26, 'Monsieur', 'Kévin', '2021-08-07 12:30:03', '12h30', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(27, 'Monsieur', 'Kévin', '2021-08-07 12:35:27', '12h00', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(28, 'Monsieur', 'Kévin', '2021-08-07 12:38:07', '12h00', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(29, 'Monsieur', 'Kévin', '2021-08-07 12:40:31', '12h00', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(30, 'Monsieur', 'Kévin', '2021-08-07 12:44:49', '12h30', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(31, 'Monsieur', 'Kévin', '2021-08-07 12:45:32', '12h30', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', ''),
(32, 'Pont', 'Louis', '2021-08-10 13:30:02', '12h00', 'Rue de l\'Ange', '58', 'Namur', 5000, '', 474712747, 'kevin.monsieur@hotmail.com', ''),
(33, 'Pont', 'Louis', '2021-08-10 13:41:11', '12h00', 'Rue de l\'Ange', '58', 'Namurr', 5220, '1000', 4452425, 'keke@fg.com', 'fsqqqqqqqqqqqqqqqqqqqqqqqqffffffffffffffffffffffffffffffffffffffffffffqqqqqqqqqq fffffffffffffffq q'),
(34, 'Monsieur', 'Kévin', '2021-08-12 14:26:13', '18h30', '6 rue de Narmont', '5', 'Pontillas', 5380, '', 47471274, 'kevin.monsieur01@gmail.com', 'je sais pasje sais pasje sais pasje sais pasje sais pasje sais pasje sais pasje sais pasje sais pasje sais pasje sais');

-- --------------------------------------------------------

--
-- Structure de la table `gestionsite`
--

DROP TABLE IF EXISTS `gestionsite`;
CREATE TABLE IF NOT EXISTS `gestionsite` (
  `gestionSiteId` int(11) NOT NULL AUTO_INCREMENT,
  `toOrder` tinyint(1) NOT NULL,
  `seeOrder` tinyint(1) NOT NULL,
  `reduction` int(11) NOT NULL,
  `message` text NOT NULL,
  `messageVisibility` tinyint(1) NOT NULL,
  PRIMARY KEY (`gestionSiteId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `gestionsite`
--

INSERT INTO `gestionsite` (`gestionSiteId`, `toOrder`, `seeOrder`, `reduction`, `message`, `messageVisibility`) VALUES
(1, 1, 1, 10, 'Nous sommes en congé jusqu\'au 20 août.', 0);

-- --------------------------------------------------------

--
-- Structure de la table `orderandcontent`
--

DROP TABLE IF EXISTS `orderandcontent`;
CREATE TABLE IF NOT EXISTS `orderandcontent` (
  `orderAndContentId` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) NOT NULL,
  `orderContentId` int(11) NOT NULL,
  PRIMARY KEY (`orderAndContentId`)
) ENGINE=MyISAM AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `orderandcontent`
--

INSERT INTO `orderandcontent` (`orderAndContentId`, `orderId`, `orderContentId`) VALUES
(12, 14, 12),
(11, 13, 11),
(3, 5, 3),
(9, 12, 9),
(10, 13, 10),
(6, 8, 6),
(7, 9, 7),
(13, 15, 13),
(14, 16, 14),
(15, 17, 15),
(34, 26, 34),
(35, 27, 35),
(18, 19, 18),
(19, 19, 19),
(20, 20, 21),
(21, 20, 20),
(22, 21, 22),
(23, 21, 23),
(24, 22, 25),
(25, 22, 26),
(26, 22, 27),
(27, 22, 24),
(28, 23, 28),
(29, 23, 30),
(30, 23, 31),
(31, 23, 29),
(32, 24, 32),
(33, 25, 33),
(36, 27, 37),
(37, 27, 36),
(38, 28, 38),
(39, 29, 39),
(40, 29, 40),
(41, 30, 41),
(42, 31, 42),
(43, 32, 43),
(44, 32, 44),
(45, 32, 45),
(46, 33, 46),
(47, 33, 47),
(48, 34, 48),
(49, 35, 49);

-- --------------------------------------------------------

--
-- Structure de la table `ordercontent`
--

DROP TABLE IF EXISTS `ordercontent`;
CREATE TABLE IF NOT EXISTS `ordercontent` (
  `orderContentId` int(11) NOT NULL AUTO_INCREMENT,
  `platId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`orderContentId`)
) ENGINE=MyISAM AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `ordercontent`
--

INSERT INTO `ordercontent` (`orderContentId`, `platId`, `quantity`) VALUES
(12, 36, 1),
(11, 36, 1),
(3, 36, 9),
(9, 36, 2),
(10, 37, 1),
(6, 36, 1),
(7, 37, 1),
(13, 36, 8),
(14, 36, 1),
(15, 36, 1),
(34, 36, 12),
(35, 39, 2),
(18, 39, 1),
(19, 37, 1),
(20, 39, 1),
(21, 37, 1),
(22, 39, 1),
(23, 37, 1),
(24, 39, 1),
(25, 37, 1),
(26, 38, 1),
(27, 36, 17),
(28, 39, 2),
(29, 38, 2),
(30, 37, 1),
(31, 36, 2),
(32, 36, 3),
(33, 37, 3),
(36, 38, 1),
(37, 36, 5),
(38, 36, 14),
(39, 38, 1),
(40, 36, 4),
(41, 38, 1),
(42, 38, 1),
(43, 39, 4),
(44, 36, 2),
(45, 38, 1),
(46, 36, 9),
(47, 39, 6),
(48, 36, 16),
(49, 39, 12);

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `orderId` int(11) NOT NULL AUTO_INCREMENT,
  `price` varchar(50) NOT NULL,
  `state` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderId`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`orderId`, `price`, `state`, `date`) VALUES
(14, '2.57', 0, '2021-07-25 15:47:50'),
(5, '23.17', 2, '2020-07-23 06:05:28'),
(8, '2.57', 1, '2021-07-23 07:00:38'),
(9, '15.51', 1, '2021-07-23 07:08:01'),
(16, '2.57', 0, '2021-07-25 15:51:29'),
(15, '20.59', 1, '2021-07-25 15:50:19'),
(13, '18.08', 0, '2021-07-25 15:45:55'),
(12, '5.15', 1, '2021-07-25 07:11:49'),
(17, '2.57', 0, '2021-07-25 15:57:10'),
(19, '18.20', 0, '2021-07-27 14:49:23'),
(20, '18.20', 0, '2021-07-27 14:51:14'),
(21, '18.20', 0, '2021-07-27 14:52:01'),
(22, '107.45', 1, '2021-07-27 14:53:52'),
(23, '117.03', 0, '2021-07-27 14:55:07'),
(24, '7.72', 2, '2021-07-28 05:24:41'),
(25, '46.52', 0, '2021-07-28 05:25:34'),
(26, '32.40', 0, '2021-08-03 07:34:48'),
(27, '64.38', 0, '2021-08-07 12:30:03'),
(28, '37.80', 0, '2021-08-07 12:35:27'),
(29, '56.29', 0, '2021-08-07 12:38:07'),
(30, '45.49', 0, '2021-08-07 12:40:31'),
(31, '45.49', 0, '2021-08-07 12:44:49'),
(32, '61.66', 0, '2021-08-07 12:45:32'),
(33, '40.45', 0, '2021-08-10 13:30:02'),
(34, '43.20', 0, '2021-08-10 13:41:11'),
(35, '32.29', 0, '2021-08-12 14:26:13');

-- --------------------------------------------------------

--
-- Structure de la table `plats`
--

DROP TABLE IF EXISTS `plats`;
CREATE TABLE IF NOT EXISTS `plats` (
  `platId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` varchar(50) NOT NULL,
  `allergy` text NOT NULL,
  `pepper` int(11) NOT NULL,
  `imageUrl` varchar(255) NOT NULL DEFAULT '',
  `cloudinaryPublicId` text NOT NULL,
  `visibility` tinyint(1) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`platId`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `plats`
--

INSERT INTO `plats` (`platId`, `name`, `description`, `price`, `allergy`, `pepper`, `imageUrl`, `cloudinaryPublicId`, `visibility`, `available`) VALUES
(39, 'végét', '', '2,99', '', 2, 'http://res.cloudinary.com/kevindev/image/upload/v1627282991/1627282990721-bezkoder-blob_rkkrdr.png', '', 1, 1),
(36, 'testtttt', '', '3,00', '', 0, 'http://res.cloudinary.com/kevindev/image/upload/v1626764204/1626764203626-bezkoder-blob_gmlnmw.jpg', '', 1, 0),
(38, 'monDessert', 'je ne sais pas trop quoi dire mais c\'est bon', '50,55', 'Modifyoeufs, lait, fuits de mer', 0, 'http://res.cloudinary.com/kevindev/image/upload/v1627282771/1627282770754-bezkoder-blob_y2krfx.jpg', '', 1, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
