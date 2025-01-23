# Wardrobe Care

Wardrobe Care is a platform designed to promote sustainability by simplifying the donation and disposal of unused clothes. It connects donors with registered NGOs while providing incentives through partnerships with clothing brands.

## Features

- **Clothes Donation**: Easily donate unused clothes to nearby NGOs.
- **Clothes Disposal**: Schedule eco-friendly disposal for clothes unsuitable for donation.
- **Incentive System**: Earn and redeem coupons/vouchers from partnered clothing brands.
- **Real-Time Tracking**: Track the progress of your donations or disposals.
- **Admin Panel**: Manage NGOs, brands, and user activities efficiently.
- **NGO Dashboard**: Handle donation requests and manage pickups/drop-offs.

## Tech Stack

- **Front-End**: Next.js, Tailwind CSS
- **Back-End**: Node.js
- **Database**: PostgreSQL, Drizzle ORM
- **Styling**: Tailwind CSS
- **Third-Party Integrations**:
  - Google Maps for locating NGOs
  - Voucher API for validating incentives
  - Notification Service (Email/SMS)

---

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- **Node.js**: [Download and install Node.js](https://nodejs.org/).
- **Git**: Ensure Git is installed on your system.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MuhammadAbyaz/wardrobe-care.git
   cd wardrobe-care
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Duplicate the `.env.example` file and rename it to `.env`.

4. **Set Up the Database**:
   - Start the database using Docker:
     ```bash
     ./start-database.sh
     ```
   - Run database migrations:
     ```bash
     npx drizzle-kit up
     ```

5. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Usage

### Donors
1. Register and log in to the platform.
2. Select donation or disposal.
3. Choose an NGO or disposal option.
4. Schedule pickup or drop-off.
5. Track your donation and earn incentives.

### Admins
1. Manage NGOs and partnered brands.
2. Monitor donations and user activities.
3. Oversee voucher system and claims.

### NGOs
1. View donation requests via the dashboard.
2. Confirm or schedule pickups/drop-offs.
3. Update the status of donations.

---

## Contributing

We welcome contributions to Wardrobe Care! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For any inquiries or support, please contact:

- **Author**: Muhammad Abyaz
- **Email**: [your_email@example.com](mailto:m.abyaz681@gmail.com)
- **GitHub**: [MuhammadAbyaz](https://github.com/MuhammadAbyaz)

---

## Screenshots

Add screenshots or GIFs of your platform to showcase its functionality and design.

---

## Acknowledgments

- Inspired by the need for sustainable solutions to clothing waste.
- Special thanks to all contributors and partners.

---

Start making a difference today with **Wardrobe Care**!

