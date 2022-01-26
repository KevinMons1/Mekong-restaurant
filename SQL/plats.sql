-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: eu-cdbr-west-01.cleardb.com    Database: heroku_826af80cfb9cee3
-- ------------------------------------------------------
-- Server version	5.6.50-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `plats`
--

DROP TABLE IF EXISTS `plats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plats` (
  `platId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` varchar(50) NOT NULL,
  `allergy` text NOT NULL,
  `pepper` int(11) NOT NULL,
  `imageUrl` varchar(255) NOT NULL DEFAULT '',
  `visibility` tinyint(1) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  `cloudinaryPublicId` text,
  PRIMARY KEY (`platId`)
) ENGINE=MyISAM AUTO_INCREMENT=2066 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plats`
--

LOCK TABLES `plats` WRITE;
/*!40000 ALTER TABLE `plats` DISABLE KEYS */;
INSERT INTO `plats` VALUES (255,'11.a Potage parfumé au lait de coco et citronnelle','à la volaille','6,50','',0,'',1,1,NULL),(245,'10.b Potage parfumé aux feuilles de lime et citronnelle','aux scampis','7,50','',2,'',1,1,NULL),(265,'11.b Potage parfumé au lait de coco et citronnelle','aux scampis','7,50','',0,'',1,1,NULL),(275,'12.a Potage Suki Yaki','aux fruits de mer','8,50','',2,'',1,1,NULL),(285,'12.b Potage Suki Yaki','au tofu et légumes','6,50','',0,'',1,1,NULL),(295,' 13.a Potage aux raviolis','Crevettes','7,50','',0,'',1,1,NULL),(305,'13.b Potage aux raviolis','Végétariens','6,50','',0,'',1,1,NULL),(235,'10.a Potage parfumé aux feuilles de lime et citronnelle','à la volaille','6,50','',2,'',1,1,NULL),(315,'20. Salade de papaye verte','','10,00','',2,'',1,1,NULL),(325,'21. Salade de volaille à la vinaigrette thaï','','9,00','',1,'',1,1,NULL),(335,'22. Salade de grandes crevettes au tom Yam','','10,00','',1,'',1,1,NULL),(345,'23. Salade végétarienne aux cacahuètes finement hachées','','8,00','',0,'',1,1,NULL),(355,'24. Salade de tofu sauce cacahuètes','','9,00','',0,'',1,1,NULL),(365,'30.a Bouchées à la vapeur','à la volaille','7,00','',0,'',1,1,NULL),(375,'30.b Bouchées à la vapeur','au boeuf','7,00','',0,'',1,1,NULL),(385,'30.c Bouchées à la vapeur','aux crevettes','8,00','',0,'',1,1,NULL),(395,'31. Croquettes de volaille aux légume et vermicelles','','7,00','',0,'',1,1,NULL),(405,'32. Saucisses de porc à la citronnelle','','7,00','',0,'',1,1,NULL),(415,'33. Brochettes','à la volaille sauce cacahuètes','7,00','',0,'',1,1,NULL),(425,'33. Brochettes','au tofu sauce cacahuètes','6,00','',0,'',1,1,NULL),(435,'34. Croissants farcis végétariens','','7,00','',0,'',1,1,NULL),(445,'35. Volaille enrobé de feuille de pendan','','7,00','',0,'',1,1,NULL),(455,'36. Raviolis frits au boeuf','','7,00','',0,'',1,1,NULL),(465,'37. Galettes de grandes crevettes et maïs','','8,00','',0,'',1,1,NULL),(475,'38. Roulades de crevettes croustillantes','','8,00','',0,'',1,1,NULL),(485,'39.a Macarons farcis à la chair de volaille, crevettes et calamars','','8,00','',0,'',1,1,NULL),(515,'40. Soupe de nouilles au porc laqué','','13,50','',0,'',1,1,NULL),(525,'41. Soupe de nouilles au canard laqué','','13,50','',0,'',1,1,NULL),(535,'42. Soupe de nouilles au poulet rôti','','13,50','',0,'',1,1,NULL),(545,'43. Soupe de nouilles aux raviolis de crevettes croustillantes','','13,50','',0,'',1,1,NULL),(555,'44. Bouillabaisse','aux fruits de mer','17,00','',1,'',1,1,NULL),(565,'44. Bouillabaisse','vegan','15,00','',0,'',1,1,NULL),(575,'50.a Curry jaune parfumé à la coriandre, pommes grenailles et oignons','à la volaille','13,00','',1,'',1,1,NULL),(585,'50.b Curry jaune parfumé à la coriandre, pommes grenailles et oignons','au filet de boeuf','14,00','',1,'',1,1,NULL),(595,'50.c Curry jaune parfumé à la coriandre, pommes grenailles et oignons','aux grandes crevettes','15,00','',1,'',1,1,NULL),(605,'50.d Curry jaune parfumé à la coriandre, pommes grenailles et oignons','au canard','15,50','',1,'',1,1,NULL),(615,'50.e Curry jaune parfumé à la coriandre, pommes grenailles et oignons','aux gambas','16,50','',1,'',1,1,NULL),(625,'50.f Curry jaune parfumé à la coriandre, pommes grenailles et oignons','aux fruits de mer','16,50','',1,'',1,1,NULL),(635,'51.a Curry thaï parfumé à la citronnelle, champignons et feuilles de lime','à la volaille','13,50','',2,'',1,1,NULL),(645,'51.b Curry thaï parfumé à la citronnelle, champignons et feuilles de lime','au filet de boeuf','14,00','',2,'',1,1,NULL),(655,'51.c Curry thaï parfumé à la citronnelle, champignons et feuilles de lime','aux grandes crevettes','15,00','',2,'',1,1,NULL),(665,'51.d Curry thaï parfumé à la citronnelle, champignons et feuilles de lime','au canard','15,50','',2,'',1,1,NULL),(675,'51.e Curry thaï parfumé à la citronnelle, champignons et feuilles de lime','aux gambas','16,50','',2,'',1,1,NULL),(685,'51.f Curry thaï parfumé à la citronnelle, champignons et feuilles de lime','aux fruits de mer','16,50','',2,'',1,1,NULL),(695,'52.a Curry brun parfumé aux oignons rôtis, raisons frais et cacahuètes hachées','à la volaille','13,00','',0,'',1,1,NULL),(705,'52.b Curry brun parfumé aux oignons rôtis, raisons frais et cacahuètes hachées','au filet de boeuf','14,00','',0,'',1,1,NULL),(715,'52.c Curry brun parfumé aux oignons rôtis, raisons frais et cacahuètes hachées','aux grandes crevettes','15,00','',0,'',1,1,NULL),(725,'52.d Curry brun parfumé aux oignons rôtis, raisons frais et cacahuètes hachées','au canard','15,50','',0,'',1,1,NULL),(735,'52.e Curry brun parfumé aux oignons rôtis, raisons frais et cacahuètes hachées','aux gambas','16,50','',0,'',1,1,NULL),(745,'52.f Curry brun parfumé aux oignons rôtis, raisons frais et cacahuètes hachées','aux fruits de mer','16,50','',0,'',1,1,NULL),(755,'53.a Curry vert parfumé au basilic thaï et aubergines thaï','à la volaille','13,00','',3,'',1,1,NULL),(765,'53.b Curry vert parfumé au basilic thaï et aubergines thaï','au filet de boeuf','14,00','',3,'',1,1,NULL),(775,'53.c Curry vert parfumé au basilic thaï et aubergines thaï','aux grandes crevettes','15,00','',3,'',1,1,NULL),(785,'53.d Curry vert parfumé au basilic thaï et aubergines thaï','au canard','15,50','',3,'',1,1,NULL),(795,'53.e Curry vert parfumé au basilic thaï et aubergines thaï','aux gambas','16,50','',3,'',1,1,NULL),(805,'53.f Curry vert parfumé au basilic thaï et aubergines thaï','aux fruits de mer','16,50','',3,'',1,1,NULL),(815,'54.a Curry rouge parfumé au basilic thaï, tomates cerises et ananas frais','à la volaille','13,00','',2,'',1,1,NULL),(825,'54.b Curry rouge parfumé au basilic thaï, tomates cerises et ananas frais','au filet de boeuf','14,00','',2,'',1,1,NULL),(835,'54.c Curry rouge parfumé au basilic thaï, tomates cerises et ananas frais','aux grandes crevettes','15,00','',2,'',1,1,NULL),(845,'54.d Curry rouge parfumé au basilic thaï, tomates cerises et ananas frais','au canard','15,50','',2,'',1,1,NULL),(855,'54.e Curry rouge parfumé au basilic thaï, tomates cerises et ananas frais','aux gambas','16,50','',2,'',1,1,NULL),(865,'54.f Curry rouge parfumé au basilic thaï, tomates cerises et ananas frais','aux fruits de mer','16,50','',2,'',1,1,NULL),(875,'55. Filet de boeuf au curry de Chiand Mai parfumé à la coriandre, échalotes et gingembre frais','','14,00','',1,'',1,1,NULL),(885,'56.a Curry jaune parfumé à la coriandre, pommes grenailles et oignons','au tofu','13,00','',1,'',1,1,NULL),(895,'56.b Curry jaune parfumé à la coriandre, pommes grenailles et oignons','au seitan','13,00','',1,'',1,1,NULL),(905,'57.a Curry vert parfumé au basilic thaï et aubergines thaï','au tofu','13,00','',3,'',1,1,NULL),(915,'57.b Curry vert parfumé au basilic thaï et aubergines thaï','au seitan','13,00','',3,'',1,1,NULL),(925,'60. Tipan canard laqué parfumé au miel gingembre infusé','','15,50','',1,'',1,1,NULL),(935,'61. Tipan larmes de tigre','','15,00','',2,'',1,1,NULL),(945,'62. Tipan aux gambas caramélisé au tamarin, poivre vert frais, feuilles de lime et échalotes','','16,50','',1,'',1,1,NULL),(955,'63. Moules aux herbes thaï','','21,50','',0,'',1,1,NULL),(965,'64. Moules au curry jaune façon thaï','','21,50','',0,'',1,1,NULL),(975,'65. Poisson cuit à la vapeur aux herbes thaï, piments frais et jus de citron vert','','16,50','',2,'',1,1,NULL),(985,'66. Volaille finement hachée aux piments et basilic thaï','','14,00','',2,'',1,1,NULL),(995,'67. Volaille fumé, feuille de bananier parfumé au coco, curry doux et basilic thaï','','14,00','',0,'',1,1,NULL),(1005,'68. Spare ribs mariné aux 5 pièces','','14,00','',0,'',1,1,NULL),(1015,'69. Cuisses de volaille (désossée), marinée aux herbes fraiches et grillée','','14,00','',0,'',1,1,NULL),(1025,'70.a Légumes et noix de cajou','à la volaille','13,00','',0,'',1,1,NULL),(1035,'70.b Légumes et noix de cajou','au filet de boeuf','14,00','',0,'',1,1,NULL),(1045,'70.c Légumes et noix de cajou','aux grandes crevettes','15,00','',0,'',1,1,NULL),(1055,'70.d Légumes et noix de cajou','au tofu','13,00','',0,'',1,1,NULL),(1065,'71.a Légumes et gingembre frais','à la volaille','13,00','',1,'',1,1,NULL),(1075,'71.b Légumes et gingembre frais','à la volaille','14,00','',1,'',1,1,NULL),(1085,'71.c Légumes et gingembre frais','aux grandes crevettes','15,00','',1,'',1,1,NULL),(1095,'71.d Légumes et gingembre frais','au tofu','13,00','',1,'',1,1,NULL),(1105,'72.a Nouilles sautées','à la volaille','13,00','',0,'',1,1,NULL),(1115,'72.b Nouilles sautées','au filet de boeuf','14,00','',0,'',1,1,NULL),(1125,'72.c Nouilles sautées','aux grandes crevettes','15,00','',0,'',1,1,NULL),(1135,'72.d Nouilles sautées','au tofu','13,00','',0,'',1,1,NULL),(1145,'73.a Riz sauté','à la volaille','13,00','',0,'',1,1,NULL),(1155,'73.b Riz sauté','au filet de boeuf','14,00','',0,'',1,1,NULL),(1165,'73.c Riz sauté','aux grandes crevettes','15,00','',0,'',1,1,NULL),(1175,'73.d Riz sauté','au tofu','13,00','',0,'',1,1,NULL),(1185,'74.a Pâtes de riz sautée','à la volaille','13,00','',0,'',1,1,NULL),(1195,'74.b Pâtes de riz sautée','au filet de boeuf','14,00','',0,'',1,1,NULL),(1205,'74.c Pâtes de riz sautée','aux grandes crevettes','15,00','',0,'',1,1,NULL),(1215,'74.d Pâtes de riz sautée','au tofu','13,00','',0,'',1,1,NULL),(1225,'75.a Phat thaï','à la volaille','13,00','',0,'',1,1,NULL),(1235,'75.b Phat thaï','au filet de boeuf','14,00','',0,'',1,1,NULL),(1245,'75.c Phat thaï','aux grandes crevettes','15,00','',0,'',1,1,NULL),(1255,'75.d Phat thaï','au tofu','13,00','',0,'',1,1,NULL),(1265,'76. Riz sauté Laotien','','15,00','',0,'',1,1,NULL),(1275,'77. Riz sauté aux fruits de mer parfumé au curry doux','','17,50','',1,'',1,1,NULL),(1285,'78. Pâtes de riz sautées au seitan parfumé au curry doux','','13,00','',1,'',1,1,NULL),(1295,'79. Riz sauté au tofu sauce cacahuètes','','13,00','',0,'',1,1,NULL),(1305,'Perles de coco','','7,00','',0,'',1,1,NULL),(1315,'Flan thaï','','7,00','',0,'',1,1,NULL),(1325,'Riz noir à la coco et banane','','7,00','',0,'',1,1,NULL),(1335,'Cheese cake au thé vert','','7,00','',0,'',1,1,NULL),(1345,'Cheese cake au yuzu','','7,00','',0,'',1,1,NULL),(1355,'Glace thé vert','','7,00','',0,'',1,1,NULL),(1365,'Glace gingembre','','7,00','',0,'',1,1,NULL),(1375,'Glace sésame blanc','','7,00','',0,'',1,1,NULL),(1385,'Glace sésame noir','','7,00','',0,'',1,1,NULL),(1395,'Sorbet lait de coco','','7,00','',0,'',1,1,NULL),(1405,'Sorbet citron vert et gingembre','','7,00','',0,'',1,1,NULL),(1415,'Sorbet framboise et yuzu','','7,00','',0,'',1,1,NULL),(1425,'Soft - Coca','','2,50','',0,'',1,1,NULL),(1435,'Soft - Coca Zéro','','2,50','',0,'',1,1,NULL),(1445,'Soft - Fanta','','2,50','',0,'',1,1,NULL),(1455,'Soft - Ice Tea','','2,50','',0,'',1,1,NULL),(1465,'Soft - Ice Tea pêche','','2,50','',0,'',1,1,NULL),(1475,'Soft - Eau plate 1/4','','2,50','',0,'',1,1,NULL),(1485,'Soft - Eau gazeuse 1/4','','2,50','',0,'',1,1,NULL),(1495,'Soft - Eau plate 1/2','','4,00','',0,'',1,1,NULL),(1505,'Soft - Eau gazeuse 1/2','','4,00','',0,'',1,1,NULL),(1515,'Soft - Schweppes Tonic','','2,50','',0,'',1,1,NULL),(1525,'Soft - Schweppes Agrum','','2,50','',0,'',1,1,NULL),(1535,'Soft - Jus de ananas','','2,50','',0,'',1,1,NULL),(1545,'Soft - Jus de mangue','','2,50','',0,'',1,1,NULL),(1555,'Soft - Jus d\'orange','','2,50','',0,'',1,1,NULL),(1565,'Soft - Jus de lychee','','2,50','',0,'',1,1,NULL),(1575,'Soft - Jus de coco','','2,50','',0,'',1,1,NULL),(1585,'Soft - Jus de Guava','','2,50','',0,'',1,1,NULL),(1595,'Bières - Jupiler','','2,80','',0,'',1,1,NULL),(1605,'Bières - Hoegarden','','2,80','',0,'',1,1,NULL),(1615,'Bières - Singha','','3,50','',0,'',1,1,NULL),(1625,'Bières - Chang','','3,50','',0,'',1,1,NULL),(1635,'Cocktails - Cocktails Maison','batida, pisang, curucao, sirop de framboise, jus d\'ananas','7,50','',0,'',1,1,NULL),(1645,'Cocktails - Cocktails Mekong','curucao, vodka, jus d\'ananas, lait de coco','7,50','',0,'',1,1,NULL),(1655,'Cocktails - Cocktails Kika','banane, lait de coco, bailey\'s','7,50','',0,'',1,1,NULL),(1665,'Cocktails sans alcool - Le Vanna-Lee','sucre de canne, jus de banane, pisang funny, jus de mangue, crème liquide','6,50','',0,'',1,1,NULL),(1675,'Cocktails sans alcool - Pisang orange','','5,00','',0,'',1,1,NULL),(1685,'Vins maison (Rouquet\'s) - Verre rouge maison','SYRAH','4,50','',0,'',1,1,NULL),(1695,'Vins maison (Rouquet\'s) - Verre blanc maison','SAUVIGNON','4,50','',0,'',1,1,NULL),(1705,'Vins maison (Rouquet\'s) - Verre rosé maison','CINSAULT','4,50','',0,'',1,1,NULL),(1715,'Vins maison (Rouquet\'s) - 1/2 maison','','8,00','',0,'',1,1,NULL),(1725,'Vins maison (Rouquet\'s) - Bouteille maison','','14,50','',0,'',1,1,NULL),(1735,'Vins blanc - Pinot gris 0.375L','OBERMEYER','15,00','',0,'',1,1,NULL),(1745,'Vins blanc - Pinot gris 75cl','OBERMEYER','27,00','',0,'',1,1,NULL),(1755,'Vins blanc - Les Peyrautins','chardonnay','21,00','',0,'',1,1,NULL),(1765,'Vins rosé - L\'aristocrate Grenache','','21,00','',0,'',1,1,NULL),(1775,'Vins rouge - Pinot noir 0.375L','OBERMEYER','15,00','',0,'',1,1,NULL),(1785,'Vins rouge - Côtes d\'Auxerre rouge Sorin Coquart','','30,00','',0,'',1,1,NULL),(1795,'Vins rouge - Saumur Champigny Ch. Villeneuve','','30,00','',0,'',1,1,NULL),(1805,'Vins rouge - St-Nicola Bourgueil Mabileau Rouilleres','','33,00','',0,'',1,1,NULL),(1815,'Vins rouge - Châteaux Haut Terrier BLAYE','','28,00','',0,'',1,1,NULL),(1825,'Bulles - Verre cava','','6,00','',0,'',1,1,NULL),(1835,'Bulles - Bouteille Cava l\'Anae','','21,00','',0,'',1,1,NULL),(1845,'Bulles - Bouteille Champagne GRUET','','38,00','',0,'',1,1,NULL),(1855,'Digestifs - Bayley\'s ','','6,50','',0,'',1,1,NULL),(1865,'Digestifs - Amaretto','','6,50','',0,'',1,1,NULL),(1875,'Digestifs - Cointreau','','6,50','',0,'',1,1,NULL),(1885,'Digestifs - Cognac','Bisquit','6,50','',0,'',1,1,NULL),(1895,'Apéritifs - Verre de cava','','6,00','',0,'',1,1,NULL),(1905,'Apéritifs - Kir','','6,00','',0,'',1,1,NULL),(1915,'Apéritifs - Pineau des charentes','','5,00','',0,'',1,1,NULL),(1925,'Apéritifs - Martini blanc','','5,00','',0,'',1,1,NULL),(1935,'Apéritifs - Martini blanc','','5,00','',0,'',1,1,NULL),(1945,'Apéritifs - Martini rouge','','5,00','',0,'',1,1,NULL),(1955,'Apéritifs - Batida','','5,00','',0,'',1,1,NULL),(1965,'Apéritifs - Campari','','5,00','',0,'',1,1,NULL),(1975,'Apéritifs - Pisang','','5,00','',0,'',1,1,NULL),(1985,'Apéritifs - Rhum brun','','6,00','',0,'',1,1,NULL),(1995,'Apéritifs - Vodka blanche','','6,00','',0,'',1,1,NULL),(2005,'Apéritifs - Jack Daniel\'s','','6,00','',0,'',1,1,NULL),(2015,'Apéritifs - William Lawson\'s','','6,00','',0,'',1,1,NULL),(2025,'Apéritifs - Gin Gordon\'s','','6,00','',0,'',1,1,NULL),(2035,'Apéritifs - Gin Saphire','','7,00','',0,'',1,1,NULL),(2045,'Apéritifs - Porto blanc','','5,00','',0,'',1,1,NULL),(2055,'Apéritifs - Porto rouge','','5,00','',0,'',1,1,NULL);
/*!40000 ALTER TABLE `plats` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-21 11:05:42