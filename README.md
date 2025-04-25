# 🏥 Doctor Listing Page - Campus Assessment

This is a responsive web application built with **React** to list doctors with client-side **search, filter, and sort** functionalities. The app uses an API to fetch doctor data and allows users to filter results based on **consultation mode**, **specialties**, and **sort options**.

---

## 📸 Preview

![Preview Screenshot](./preview.png) <!-- Optional: Add screenshot or attach later -->

---

## 🚀 Features

- 🔍 **Autocomplete Search Bar** – Search by doctor names with dropdown suggestions.
- 🧰 **Filter Panel**:
  - Mode of consultation: Video / In Clinic
  - Multi-select specialties
  - Sort by fees (ascending) or experience (descending)
- 🧠 All filtering and searching handled **entirely on the client side**
- 🔗 **Query Parameters** persist search/filter settings on refresh and navigation
- 🧪 Supports automated testing with `data-testid` attributes

---

## 🔧 Tech Stack

- React (Vite or CRA)
- JavaScript
- HTML/CSS
- Git & GitHub

---

## 🌐 API Used

- **URL**: [Doctor API](https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json)
- All data is fetched once; filtering/search is client-side only.
