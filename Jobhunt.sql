-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 23, 2018 at 04:42 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Jobhunt`
--

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `job_title` text NOT NULL,
  `company_name` text NOT NULL,
  `description` longtext NOT NULL,
  `applications` longtext NOT NULL,
  `date` varchar(10) NOT NULL,
  `company_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `job_title`, `company_name`, `description`, `applications`, `date`, `company_id`) VALUES
(16, 'Software Engineer', 'Abc corp', 'This is a nice company. In this profile you have to work for 10 hours a week only.', '[{\"id\":44,\"name\":\"Shubham kumar Puri\",\"email\":\"shubhampuri8169@gmail.com\",\"password\":\"123456\",\"type\":1},{\"id\":47,\"name\":\"Skpuri\",\"email\":\"shubham8169@gmail.com\",\"password\":\"123456\",\"type\":1},{\"id\":48,\"name\":\"Rahul\",\"email\":\"skpuri@gmail.com\",\"password\":\"123456\",\"type\":1}]', 'Thu Nov 22', 45),
(18, 'Hiring Manager', 'ABC corp', 'Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content.', '[]', 'Fri Nov 23', 49),
(19, 'Designer', 'ABC Corp', 'this profile is good for those who think that working hard can change your fate.', '[{\"id\":44,\"name\":\"Shubham kumar Puri\",\"email\":\"shubhampuri8169@gmail.com\",\"password\":\"123456\",\"type\":1}]', 'Fri Nov 23', 49),
(20, 'Final Job Test', 'ABC Corp', 'What is Lorem Ipsum?\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nWhy do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing', '[]', 'Fri Nov 23', 49),
(21, 'Last job', 'ShubhamPuri', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '[]', 'Fri Nov 23', 49);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(35) NOT NULL,
  `password` varchar(60) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `type`) VALUES
(44, 'Shubham kumar Puri', 'shubhampuri8169@gmail.com', '123456', 1),
(45, 'Shubham kumar Puri', 'shubhampuri@gmail.com', '123456', 2),
(46, 'Shubham kumar Puri', 'shubham@gmail.com', '123456', 1),
(47, 'Skpuri', 'shubham8169@gmail.com', '123456', 1),
(48, 'Rahul', 'skpuri@gmail.com', '123456', 1),
(49, 'Abc Corp', 'abccorp@gmail.com', '123456', 2),
(50, 'Ratan', 'rahul@gmail.com', '123456', 1),
(51, 'Shubham kumar Puri', 'shub@gmail.com', '123456', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_ibfk_1` (`company_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
