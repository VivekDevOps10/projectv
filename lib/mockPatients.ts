import { Patient } from "./types";

const names = [
  "Rajesh Kumar",
  "Priya Sharma",
  "Amit Verma",
  "Neha Singh",
  "Suresh Patel",
  "Pooja Nair",
  "Karan Malhotra",
  "Anjali Gupta",
  "Ravi Iyer",
  "Meera Joshi",
  "Vikas Reddy",
  "Swati Chawla",
  "Arjun Das",
  "Kavita Rao",
  "Mohit Bansal",
  "Sneha Pillai",
  "Deepak Yadav",
  "Ritu Saxena",
  "Nitin Agarwal",
  "Shalini Menon",
  "Harish Bhat",
  "Divya Kapoor",
  "Sunil Mishra",
  "Radhika Sen",
  "Naveen Jain",
  "Farah Ali",
  "Lokesh Mehta",
  "Tanya Arora",
  "Prakash Kulkarni",
  "Ishita Roy",
  "Gaurav Tiwari",
  "Mansi Trivedi",
  "Yash Khanna",
  "Asha Deshpande",
  "Rahul Sinha",
  "Komal Arvind"
];

export const initialPatients: Patient[] = names.map((name, index) => ({
  id: index + 1,
  token: index + 1,
  name,
  status: index === 0 ? "Inside" : "Waiting",
  checkInTime: `09:${String((index * 3) % 60).padStart(2, "0")}`
}));
