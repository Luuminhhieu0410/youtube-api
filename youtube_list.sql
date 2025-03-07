-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2025 at 03:57 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `youtube_list`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `createAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `name`, `username`, `password`, `createAt`) VALUES
(1, 'Minh Hiệu', 'hieu', '1', '2025-02-24 21:38:52'),
(14, 'test', 'test1', 'test', '2025-02-27 17:24:15'),
(15, 'test', 'test', 'test', '2025-03-03 17:57:32'),
(16, '<h1>alo</h1>', 'test2', '123', '2025-03-03 18:09:14'),
(17, 'hieu', 'alo', 'alo', '2025-03-03 20:31:32'),
(18, 'Lưu ', 'alo1', 'alo', '2025-03-04 15:53:31'),
(20, '<h1>alo</h1>', 'com', 'com', '2025-03-05 20:54:07');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `title` text NOT NULL,
  `videoId` varchar(50) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `createAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `userId`, `title`, `videoId`, `thumbnail`, `createAt`) VALUES
(8, 14, 'Có Khi Nào Rời Xa (Lofi Lyrics) - Hùng Quân x H2O | Biết Đâu Bất Ngờ Đôi Ta Chợt Rời Xa Nhau', 'eA06dIr2Zh4', 'default.jpg', '2025-03-02 15:31:41'),
(11, 14, 'Cô Ấy Nói (Lofi Ver.) - Ngô Anh Đạt x Freak D', '59uP6DOkYTM', 'default.jpg', '2025-03-02 15:44:39'),
(12, 14, 'Cô Ấy Nói (Orinn Remix) - Ngô Anh Đạt | Nhạc Trẻ Remix Edm Tik Tok Gây Nghiện Nhất 2021', '2w_Rs-riS-U', 'default.jpg', '2025-03-02 15:47:36'),
(24, 16, 'Chúng Ta Của Hiện Tại', 'bNp9pn0ni3I', 'default.jpg', '2025-03-03 18:09:54'),
(34, 1, 'Chúng Ta Của Hiện Tại', 'bNp9pn0ni3I', 'default.jpg', '2025-03-03 20:38:51'),
(37, 1, 'Cô Ấy Nói (Orinn Remix) - Ngô Anh Đạt | Nhạc Trẻ Remix Edm Tik Tok Gây Nghiện Nhất 2021', '2w_Rs-riS-U', 'default.jpg', '2025-03-03 20:41:18'),
(43, 18, 'Suýt Nữa Thì (Lofi Ver.) - Andiez x Freak D', 'Sk5s8I-tbX0', 'default.jpg', '2025-03-04 15:53:47'),
(44, 1, 'MIN - ĐỪNG YÊU NỮA, EM MỆT RỒI | OFFICIAL MUSIC VIDEO', '2sIC1sh-yc0', 'default.jpg', '2025-03-04 15:56:54'),
(45, 1, 'Chờ Đợi Có Đáng Sợ (Lofi Ver.) - Andiez x Freak D', 'ko6KQq04qIc', 'default.jpg', '2025-03-04 17:29:58'),
(47, 20, 'Suýt Nữa Thì (Lofi Ver.) - Andiez x Freak D', 'Sk5s8I-tbX0', 'default.jpg', '2025-03-05 20:56:11'),
(48, 1, 'NÃO CÁ VÀNG | ONLY C ft. LOU HOÀNG | OFFICIAL MV 2017', 'r3iKrM6hImQ', 'default.jpg', '2025-03-05 21:28:50'),
(49, 1, 'Đếm Ngày Xa Em | Only C ft. Lou Hoàng | Official MV | Nhạc trẻ mới hay tuyển chọn', 'rtviC6i42bc', 'default.jpg', '2025-03-05 21:29:02'),
(50, 1, 'Anh Đã Quen Với Cô Đơn ( Lyric Video ) - Soobin | Anh thường hay vẫn nằm mơ về một ngôi nhà Tik Tok', 'x-_2eo7cSI0', 'default.jpg', '2025-03-05 21:29:10'),
(51, 1, 'Có Khi Nào Rời Xa (Lofi Lyrics) - Hùng Quân x H2O | Biết Đâu Bất Ngờ Đôi Ta Chợt Rời Xa Nhau', 'eA06dIr2Zh4', 'default.jpg', '2025-03-05 21:29:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
