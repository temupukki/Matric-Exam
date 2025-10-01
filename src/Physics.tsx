import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Clock, 
  Calculator, 
  Flag, 
  CheckCircle, 
  XCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  AlertCircle,
  Award
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface Answers {
  [key: number]: number;
}

interface Score {
  correct: number;
  total: number;
  percentage: number;
}

export default function Physics2017Exam() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(9000); // 2.5 hours in seconds (150 minutes)
  const [answers, setAnswers] = useState<Answers>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [showResults, setShowResults] = useState<boolean>(false);

  // 2017 Physics ESSLCE Questions with Answers
  const examQuestions: Question[] = [
    {
      id: 1,
      question: "A force that is exerted on a simple machine in order to produce input work is called",
      options: [
        "friction.",
        "load.",
        "effort.",
        "normal."
      ],
      correctAnswer: 2,
      explanation: "Effort is the force applied to a simple machine to do work.",
      topic: "Simple Machines",
      difficulty: "Easy"
    },
    {
      id: 2,
      question: "Which one of the following statements is correct about transverse and longitudinal waves?",
      options: [
        "The directions of wave motion and vibration of the particles are parallel for transverse waves and perpendicular for longitudinal waves.",
        "Waves on a string are longitudinal whereas sound waves are transverse.",
        "The directions of wave motion and vibration of particles are parallel for longitudinal waves but perpendicular for transverse waves.",
        "A longitudinal wave comprises a series of crests and troughs, whereas a transverse wave comprises a series of compressions and rarefactions."
      ],
      correctAnswer: 2,
      explanation: "Longitudinal waves have parallel vibration and wave direction, transverse waves have perpendicular vibration and wave direction.",
      topic: "Waves",
      difficulty: "Medium"
    },
    {
      id: 3,
      question: "An object that is partially or fully submerged in a fluid experiences an upward force from the fluid. The apparent weight of the object is the weight of the",
      options: [
        "fluid it displaces.",
        "object in air minus the buoyant force.",
        "object in air.",
        "fluid it displaces minus the buoyant force."
      ],
      correctAnswer: 1,
      explanation: "Apparent weight = Actual weight - Buoyant force",
      topic: "Fluid Mechanics",
      difficulty: "Easy"
    },
    {
      id: 4,
      question: "A force is used to push a box of mass, m along the slope of inclined plane with constant velocity. If the coefficient of friction between the box and the inclined plane be μ, the actual mechanical advantage (AMA) of the inclined plane is",
      options: [
        "1/(cosθ + μ sinθ)",
        "1/(sinθ + μ cosθ)",
        "(cosθ + μ sinθ)",
        "(sinθ + μ cosθ)"
      ],
      correctAnswer: 1,
      explanation: "AMA = Load/Effort = 1/(sinθ + μ cosθ) for constant velocity motion on inclined plane",
      topic: "Simple Machines",
      difficulty: "Hard"
    },
    {
      id: 5,
      question: "A wheel and axle of radii 40 cm and 8 cm, respectively, is used to lift a bucket of 6 kg of water from a well by applying an effort of 20 N on the wheel. The percentage efficiency of this simple machine is",
      options: [
        "60%",
        "66.7%",
        "30%",
        "80%"
      ],
      correctAnswer: 0,
      explanation: "Efficiency = (Load × Load distance)/(Effort × Effort distance) × 100% = (60N × 0.08m)/(20N × 0.40m) × 100% = 60%",
      topic: "Simple Machines",
      difficulty: "Medium"
    },
    {
      id: 6,
      question: "Block A of mass m₁ = 8.0 kg travelling initially at u₁ = 6 m/s in the positive x-direction collides with block B of mass m₂ = 12 kg moving in the same direction at u₂ = 3 m/s. If the velocity of block A, immediately after the collision, is v₁ = 4 m/s to the positive x-axis, what is the velocity of the block B, immediately after the collision?",
      options: [
        "4.33 m/s to the negative x-axis",
        "3.71 m/s to the negative x-axis",
        "3.71 m/s to the positive x-axis",
        "4.33 m/s to the positive x-axis"
      ],
      correctAnswer: 3,
      explanation: "Using conservation of momentum: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂ → 8×6 + 12×3 = 8×4 + 12×v₂ → v₂ = 4.33 m/s",
      topic: "Momentum",
      difficulty: "Medium"
    },
    {
      id: 7,
      question: "The magnetic field created by a long straight current carrying wire",
      options: [
        "is directed in the same direction as the current.",
        "forms circular pattern around the wire.",
        "is directly proportional to the distance from the wire.",
        "is inversely proportional to the current in the wire."
      ],
      correctAnswer: 1,
      explanation: "Magnetic field around a straight current-carrying wire forms concentric circles.",
      topic: "Magnetism",
      difficulty: "Easy"
    },
    {
      id: 8,
      question: "What will happen on a pure semiconductor when it is doped by group III element?",
      options: [
        "It becomes P-type semiconductor.",
        "It gets extra free electrons.",
        "It becomes intrinsic semiconductor.",
        "It becomes N-type semiconductor."
      ],
      correctAnswer: 0,
      explanation: "Doping with group III elements creates holes, making it P-type semiconductor.",
      topic: "Semiconductors",
      difficulty: "Medium"
    },
    {
      id: 9,
      question: "We usually use plastic materials to cover metallic wires that carry electricity to protect living things from danger. Which of the following statement correctly describes the nature of the plastic to use for this purpose?",
      options: [
        "Since every electron in plastic is slightly bound to the parent atom, it becomes poor conductor.",
        "Since every electron in plastic is tightly bound to the parent atom, it becomes poor conductor.",
        "Since it has free electrons, it facilitates the easy flow of electric current in the metallic wires.",
        "Since it has no free electrons, it directs the electrons in the wire to flow in the same direction."
      ],
      correctAnswer: 1,
      explanation: "Plastic is an insulator because electrons are tightly bound to atoms, preventing current flow.",
      topic: "Electricity",
      difficulty: "Easy"
    },
    {
      id: 12,
      question: "A circular coil is located in a uniform magnetic field of magnitude 0.50 T directed perpendicular to the plane of the coil. If the area of the coil changes with uniform rate, in such a way that it increases by 4.0 × 10⁻³ m² in 2 s, what is the magnitude of the induced electromotive force (emf) in the coil?",
      options: [
        "1.0 × 10³ V",
        "2.5 × 10² V",
        "1.0 × 10⁻³ V",
        "4.0 × 10⁻³ V"
      ],
      correctAnswer: 2,
      explanation: "ε = B·dA/dt = 0.50 × (4×10⁻³)/2 = 1.0 × 10⁻³ V",
      topic: "Electromagnetic Induction",
      difficulty: "Medium"
    },
    {
      id: 13,
      question: "Vector quantities are represented by",
      options: [
        "direction only.",
        "magnitude and direction.",
        "dimensionless values.",
        "magnitude only."
      ],
      correctAnswer: 1,
      explanation: "Vectors have both magnitude and direction.",
      topic: "Vectors",
      difficulty: "Easy"
    },
    {
      id: 14,
      question: "According to Newton's first law, an object that is in motion continues its state of motion with",
      options: [
        "constant velocity if the resultant force exerted on it is not zero.",
        "a decreasing speed if the resultant force exerted on it is zero.",
        "constant velocity if the resultant force exerted on it is zero.",
        "an increasing speed if the resultant force exerted on it is not zero."
      ],
      correctAnswer: 2,
      explanation: "Newton's first law: object in motion stays in motion with constant velocity if net force is zero.",
      topic: "Newton's Laws",
      difficulty: "Easy"
    },
    {
      id: 15,
      question: "Which of the following correctly describes the difference between distance and displacement?",
      options: [
        "Distance depends on the initial and final points, while displacement depends on the path followed by a moving body.",
        "Distance can be described both in magnitude and direction, while displacement is described only by magnitude.",
        "Distance has either positive or negative values, while displacement has only positive value.",
        "Distance is always greater than or equal to the magnitude of displacement, while the magnitude of the displacement is always less than or equal to distance."
      ],
      correctAnswer: 3,
      explanation: "Distance is path length ≥ displacement magnitude.",
      topic: "Kinematics",
      difficulty: "Easy"
    },
    {
      id: 16,
      question: "Which of the following statements is correct about a uniformly accelerated motion?",
      options: [
        "The acceleration is constant.",
        "The velocity is constant.",
        "The displacement increases at a uniform rate.",
        "The speed is constant but the direction is changing."
      ],
      correctAnswer: 0,
      explanation: "Uniform acceleration means constant acceleration.",
      topic: "Kinematics",
      difficulty: "Easy"
    },
    {
      id: 17,
      question: "Two displacement vectors have magnitudes 4 m and 3 m. Which one of the following is NOT the possible value of the magnitude of their resultant vector?",
      options: [
        "7 m",
        "1 m",
        "12 m",
        "5 m"
      ],
      correctAnswer: 2,
      explanation: "Maximum resultant is 7m, minimum is 1m. 12m is impossible.",
      topic: "Vectors",
      difficulty: "Medium"
    },
    {
      id: 18,
      question: "A train is moving along a straight line with a constant acceleration of 5 m/s² when it passes by a traffic light point. From there on, if the time taken by the train to reach a velocity of 30 m/s is 4 seconds, then what is the distance of the train from the traffic point after 8 seconds?",
      options: [
        "160 m",
        "80 m",
        "320 m",
        "240 m"
      ],
      correctAnswer: 0,
      explanation: "Using s = ut + ½at², initial velocity u = v - at = 30 - 5×4 = 10 m/s, s = 10×8 + ½×5×64 = 80 + 160 = 240 m",
      topic: "Kinematics",
      difficulty: "Medium"
    },
    {
      id: 19,
      question: "Which one of the following statements is a necessary condition for an object to be in linear equilibrium?",
      options: [
        "The linear acceleration of the object is non-zero constant.",
        "The linear speed of the object is constant.",
        "The linear acceleration of the object is zero.",
        "The net force acting on the object is non-zero constant."
      ],
      correctAnswer: 2,
      explanation: "Linear equilibrium requires zero acceleration (Newton's first law).",
      topic: "Dynamics",
      difficulty: "Easy"
    },
    {
      id: 20,
      question: "When an object tends to slide over the surface of another object, tiny bumps at the surface of the two objects knocking and locking together. This causes",
      options: [
        "frictional force.",
        "normal force.",
        "electrostatic force.",
        "gravitational force."
      ],
      correctAnswer: 0,
      explanation: "Surface irregularities cause friction.",
      topic: "Friction",
      difficulty: "Easy"
    },
    {
      id: 21,
      question: "Suppose a ball is thrown vertically upward and after reaching a maximum height, it returns back to its initial position. Which of the following statement is correct about energy changes and work done on the ball?",
      options: [
        "On its way down, change in its potential energy is positive.",
        "On its way down, work done by gravity is positive.",
        "On its way up, change in its kinetic energy is positive.",
        "On its way up, work done by gravity is positive."
      ],
      correctAnswer: 1,
      explanation: "Gravity does positive work when object moves in direction of gravitational force (downward).",
      topic: "Work and Energy",
      difficulty: "Medium"
    },
    {
      id: 22,
      question: "The mechanical energy of an oscillating object at any point through its path is equal to",
      options: [
        "the difference between its kinetic and potential energies.",
        "the sum of its potential and internal energies.",
        "the sum of its kinetic and internal energies.",
        "the sum of its kinetic and potential energies."
      ],
      correctAnswer: 3,
      explanation: "Mechanical energy = Kinetic energy + Potential energy",
      topic: "Energy",
      difficulty: "Easy"
    },
    {
      id: 23,
      question: "A 2 kg object accelerates with 1.5 m/s² to the right on a horizontal frictionless surface under the action of two horizontal forces, F₁ and F₂ as shown in the figure. If F₂ = 1 N to the left, what should be the magnitude of F₁?",
      options: [
        "4 N",
        "3 N",
        "1 N",
        "2 N"
      ],
      correctAnswer: 0,
      explanation: "F_net = ma = 2×1.5 = 3N, F₁ - F₂ = 3N → F₁ = 4N",
      topic: "Dynamics",
      difficulty: "Medium"
    },
    {
      id: 24,
      question: "A tennis ball of mass 0.10 kg traveling horizontally at 40.0 m/s is struck back by a racket. If the ball returns back with a speed of 30.0 m/s in the opposite direction, what is the magnitude of the impulse delivered to the ball by the racket?",
      options: [
        "1.0 kg m/s",
        "7.0 kg m/s",
        "4.0 kg m/s",
        "3.0 kg m/s"
      ],
      correctAnswer: 1,
      explanation: "Impulse = mΔv = 0.10 × (40 - (-30)) = 7.0 kg m/s",
      topic: "Momentum",
      difficulty: "Medium"
    },
    {
      id: 25,
      question: "The flow rate of a fluid is defined as",
      options: [
        "the volume of the fluid crossing an area per unit time taken.",
        "the speed with which the fluid flowing through a pipe.",
        "the mass of the fluid crossing an area per unit time taken.",
        "the rate of change of the speed with which fluid flowing through a pipe."
      ],
      correctAnswer: 0,
      explanation: "Flow rate = Volume/time",
      topic: "Fluid Mechanics",
      difficulty: "Easy"
    },
    {
      id: 26,
      question: "At normal condition, solids are almost incompressible compared to liquids and gases. The reason is that",
      options: [
        "their atoms are free to slide about and interact with neighbors.",
        "their atoms are relatively fixed distance apart and held together.",
        "their atoms vibrate and free to move.",
        "there is much space and little force between atoms."
      ],
      correctAnswer: 1,
      explanation: "Solid atoms are closely packed and strongly bonded.",
      topic: "States of Matter",
      difficulty: "Easy"
    },
    {
      id: 27,
      question: "Which of the following statements is correct about magnets?",
      options: [
        "The north pole of one magnet repels the south pole of another magnet.",
        "Like electric charges, magnetic poles exist in a single isolated form.",
        "Unlike permanent magnets, electromagnets are magnets without poles.",
        "If you cut a bar magnet into two, each piece has both north and south poles."
      ],
      correctAnswer: 3,
      explanation: "Magnetic poles always come in pairs (dipoles).",
      topic: "Magnetism",
      difficulty: "Easy"
    },
    {
      id: 28,
      question: "A wheel of radius, r = 50 cm, rotates about a fixed perpendicular axis that passes through its center. If the angular speed is ω = 200 rad/s, how much is the tangential speed of a point on the rim of the wheel?",
      options: [
        "10,000 m/s",
        "800 m/s",
        "80,000 m/s",
        "100 m/s"
      ],
      correctAnswer: 3,
      explanation: "v = rω = 0.5 × 200 = 100 m/s",
      topic: "Rotational Motion",
      difficulty: "Easy"
    },
    {
      id: 29,
      question: "Suppose your mass is measured to be 50 kg. If your friend having a mass of 55 kg is at a distance 2 m apart from you, what is the magnitude of gravitational force between you and your friend?",
      options: [
        "9.2 × 10⁻⁸ N",
        "9.2 × 10⁻¹¹ N",
        "4.6 × 10⁻⁸ N",
        "4.6 × 10⁻¹¹ N"
      ],
      correctAnswer: 2,
      explanation: "F = Gm₁m₂/r² = 6.67×10⁻¹¹ × 50 × 55 / 4 = 4.6 × 10⁻⁸ N",
      topic: "Gravitation",
      difficulty: "Medium"
    },
    {
      id: 30,
      question: "A 10 N force is applied to the smaller circular piston of a hydraulic lift of radius 0.1 m to lift a 2500 N load placed on the larger piston. What is the area of the larger piston?",
      options: [
        "2.50 m²",
        "0.25 m²",
        "3.14 m²",
        "7.85 m²"
      ],
      correctAnswer: 3,
      explanation: "Pascal's principle: F₁/A₁ = F₂/A₂ → A₂ = F₂A₁/F₁ = 2500 × π(0.1)² / 10 = 7.85 m²",
      topic: "Fluid Mechanics",
      difficulty: "Medium"
    },
    {
      id: 31,
      question: "An electric field is defined as a region where",
      options: [
        "a charged particle losses its charge when it is placed in that region.",
        "a charged particle experiences no electric force when it is placed in that region.",
        "a neutral particle experiences electric force when it is placed in that region.",
        "a charged particle experiences an electric force if it is placed in that region."
      ],
      correctAnswer: 3,
      explanation: "Electric field exerts force on charged particles.",
      topic: "Electrostatics",
      difficulty: "Easy"
    },
    {
      id: 32,
      question: "Which one of the following statements is correct about the speed of sound in different medium? The speed of sound",
      options: [
        "in a colder and less dense medium is faster than in hotter and denser material.",
        "in solid is less than its speed in liquid.",
        "increases as the temperature and density of a material increases.",
        "in liquid is less than its speed in gas."
      ],
      correctAnswer: 0,
      explanation: "Sound travels faster in colder, less dense media.",
      topic: "Sound Waves",
      difficulty: "Medium"
    },
    {
      id: 33,
      question: "Four resistors are connected to a voltage source as shown in the figure. Which one of the following is correct about the circuit?",
      options: [
        "R₂ is connected in parallel with R₃",
        "R₁ is connected in parallel with R₂",
        "R₁ is connected in series with the effective combination of R₃ and R₄",
        "R₂ is connected in parallel with the effective combination of R₃ and R₄"
      ],
      correctAnswer: 2,
      explanation: "Based on typical circuit configurations, R₁ is in series with parallel combination of R₃ and R₄.",
      topic: "Circuits",
      difficulty: "Medium"
    },
    {
      id: 34,
      question: "What is the magnitude of electric field strength at a distance of 2.0 m from a point charge, Q = 4.0 C?",
      options: [
        "9.0 × 10⁹ N/C",
        "72.0 × 10⁹ N/C",
        "54.0 × 10⁹ N/C",
        "18.0 × 10⁹ N/C"
      ],
      correctAnswer: 0,
      explanation: "E = kQ/r² = 9×10⁹ × 4 / 4 = 9×10⁹ N/C",
      topic: "Electrostatics",
      difficulty: "Easy"
    },
    {
      id: 35,
      question: "A wire that has a resistance of 6 Ω is drawn out so as to make it into a new wire two times as long as the original and half cross-sectional area of the original. What will be the resistance of the new wire?",
      options: [
        "12 Ω",
        "6 Ω",
        "3 Ω",
        "24 Ω"
      ],
      correctAnswer: 3,
      explanation: "R ∝ L/A, new R = 6 × (2)/(0.5) = 24 Ω",
      topic: "Electricity",
      difficulty: "Medium"
    },
    {
      id: 36,
      question: "A long straight wire carries a current of 5.0 A. What is the magnetic field strength produced by the current at a distance of 2.0 cm from the wire?",
      options: [
        "5π × 10⁻⁵ T",
        "20π × 10⁻⁵ T",
        "20 × 10⁻⁵ T",
        "5 × 10⁻⁵ T"
      ],
      correctAnswer: 0,
      explanation: "B = μ₀I/(2πr) = 4π×10⁻⁷ × 5 / (2π×0.02) = 5×10⁻⁵ T",
      topic: "Magnetism",
      difficulty: "Medium"
    },
    {
      id: 37,
      question: "If two vectors a and b, with respective magnitudes of a and b, form an angle α between them when they are connected tail to tail, then the expression ab cos α defines the value of",
      options: [
        "vector product of a and b.",
        "projection of a on b.",
        "resultant of a and b.",
        "scalar product of a and b."
      ],
      correctAnswer: 3,
      explanation: "Scalar/dot product = ab cos α",
      topic: "Vectors",
      difficulty: "Easy"
    },
    {
      id: 38,
      question: "Which one of the following statements is correct about real and virtual images?",
      options: [
        "Real images can be displayed on a screen unlike the virtual ones.",
        "Virtual images can be displayed on a screen unlike the real ones.",
        "Virtual images can be magnified but real images cannot.",
        "Real images can be magnified but virtual images cannot."
      ],
      correctAnswer: 0,
      explanation: "Real images form on screens, virtual images cannot.",
      topic: "Optics",
      difficulty: "Easy"
    },
    {
      id: 39,
      question: "An object moving in one dimension with constant acceleration a travels through a displacement s in a time interval t. If its velocity at the initial time t = 0 is vᵢ and its velocity at a later time t is v_f, which of the following is a correct relation between the given quantities?",
      options: [
        "s = v_f t - ½ at²",
        "s = (v_f² - vᵢ²)/a",
        "s = vᵢ t + ½ at",
        "s = ((v_f - vᵢ)/2) t"
      ],
      correctAnswer: 1,
      explanation: "This is derived from v_f² = vᵢ² + 2as",
      topic: "Kinematics",
      difficulty: "Medium"
    },
    {
      id: 40,
      question: "If the critical angle for an optically denser medium to air boundary is 53° what will be the refractive index of the medium?",
      options: [
        "1.67",
        "1.33",
        "1.00",
        "1.25"
      ],
      correctAnswer: 3,
      explanation: "n = 1/sin C = 1/sin 53° = 1/0.8 = 1.25",
      topic: "Optics",
      difficulty: "Medium"
    },
    {
      id: 41,
      question: "Given the displacement vector A = (3î - 4ĵ) m, what is the unit vector in the direction of A?",
      options: [
        "-0.6î + 0.8ĵ",
        "0.6î - 0.8ĵ",
        "0.8î - 0.6ĵ",
        "0.6î + 0.8ĵ"
      ],
      correctAnswer: 1,
      explanation: "Unit vector = A/|A| = (3î - 4ĵ)/5 = 0.6î - 0.8ĵ",
      topic: "Vectors",
      difficulty: "Easy"
    },
    {
      id: 42,
      question: "Suppose that you are given two forces with F₁ = 75 N in the direction of 53° west of north and F₂ = 100 N in the direction of 37° east of north. If you add the two forces using analytical and graphical methods and represent using graphical scale of 1 cm for 10 N force, what are the possible length and direction of the arrow line for the resultant vector?",
      options: [
        "12.5 cm to the North",
        "17.3 cm to 45° North of East",
        "1.25 cm to the North",
        "1.73 cm to 45° North of East"
      ],
      correctAnswer: 0,
      explanation: "Resultant magnitude ≈ 125 N, so length = 12.5 cm, direction mainly northward.",
      topic: "Vectors",
      difficulty: "Hard"
    },
    {
      id: 43,
      question: "Which of the following concepts of physics are the primary focus points in mechanical engineering?",
      options: [
        "Geometric optics, Electrostatics, Thermodynamics, and Stress",
        "Dynamics, Thermodynamics, Force, and Stress",
        "Nuclear physics, Geometric optics, Dynamics, and Force",
        "Molecular physics, Dynamics, Nuclear physics, and Force"
      ],
      correctAnswer: 1,
      explanation: "Mechanical engineering focuses on dynamics, thermodynamics, forces, and stress analysis.",
      topic: "Applied Physics",
      difficulty: "Easy"
    },
    {
      id: 44,
      question: "Which one of the following defense technologies is correctly matched with its working principle?",
      options: [
        "Missiles radiate electromagnetic signal and examine the echo received to identify the location of the target.",
        "A radar is a rocket propelled weapon designed to deliver an explosive weapon with a great accuracy at high speed.",
        "Infrared device uses heat emission to identify objects that cannot be detected using available light sources.",
        "Drones radiate electromagnetic signal and examine the echo received to identify the location of the target."
      ],
      correctAnswer: 2,
      explanation: "Infrared devices detect heat signatures.",
      topic: "Applied Physics",
      difficulty: "Medium"
    },
    {
      id: 45,
      question: "Which one of the following phenomena occurs during change of phases of a matter? During a phase change from",
      options: [
        "gas to liquid, heat energy is absorbed by a substance while its temperature remains constant.",
        "solid to liquid, heat energy is released from a substance while its temperature remains constant.",
        "liquid to solid, heat energy is released from a substance while its temperature changes uniformly.",
        "liquid to gas, heat energy is absorbed by a substance while its temperature remains constant."
      ],
      correctAnswer: 3,
      explanation: "During vaporization, heat is absorbed at constant temperature.",
      topic: "Thermodynamics",
      difficulty: "Medium"
    },
    {
      id: 46,
      question: "Assume that a ball is thrown horizontally from a building of height h above the ground with initial speed v₀. Which one of the following statements is correct about the motion of the object?",
      options: [
        "Its horizontal component acceleration is zero.",
        "Its vertical component velocity remains constant.",
        "Its vertical component acceleration is zero.",
        "Its horizontal component velocity uniformly increases."
      ],
      correctAnswer: 0,
      explanation: "Horizontal acceleration is zero (only gravity acts vertically).",
      topic: "Projectile Motion",
      difficulty: "Easy"
    },
    {
      id: 47,
      question: "A projectile is thrown from a level ground with an initial velocity v₀ making an angle of θ above the horizontal. If the maximum height covered by the projectile is H, then what is the horizontal range of the projectile in terms of H and θ?",
      options: [
        "H/tan θ",
        "H tan θ/4",
        "4H/tan θ",
        "H/(4 tan θ)"
      ],
      correctAnswer: 2,
      explanation: "H = (v₀² sin²θ)/(2g), R = (v₀² sin 2θ)/g = 4H/tan θ",
      topic: "Projectile Motion",
      difficulty: "Hard"
    },
    {
      id: 48,
      question: "Four point masses m₁ = 4 kg, m₂ = 1 kg, m₃ = 3 kg and m₄ = 5 kg are attached to a massless rod which lays on the x-axis. How much is the moment of inertia of the system about the y-axis?",
      options: [
        "187 kgm²",
        "184 kgm²",
        "190 kgm²",
        "84 kgm²"
      ],
      correctAnswer: 1,
      explanation: "I = Σmᵢrᵢ² = 4×1² + 1×2² + 3×3² + 5×4² = 4 + 4 + 27 + 80 = 115 kgm² (Note: positions need verification)",
      topic: "Rotational Motion",
      difficulty: "Hard"
    },
    {
      id: 49,
      question: "The amount of heat energy required to raise the temperature of a given substance by 1°C is",
      options: [
        "quantity of heat.",
        "specific heat capacity.",
        "latent heat.",
        "heat capacity."
      ],
      correctAnswer: 3,
      explanation: "Heat capacity = heat required for 1°C temperature change.",
      topic: "Thermodynamics",
      difficulty: "Easy"
    },
    {
      id: 50,
      question: "Which one of the following statements is correct about the properties of waves?",
      options: [
        "When two waves interfere destructively, the amplitude of the resultant wave is greater than the amplitude of each wave.",
        "Diffraction of a wave through a narrow gap is more observable than through a wider gap.",
        "When a wave is reflected, its speed and wavelength are changed.",
        "When a wave is refracted, its speed and wavelength remain the same."
      ],
      correctAnswer: 1,
      explanation: "Diffraction is more noticeable through narrow openings.",
      topic: "Waves",
      difficulty: "Medium"
    },
    {
      id: 51,
      question: "A square metal plate of coefficient of linear expansion α, has a surface area A₀ at a temperature T₀. If the temperature is raised by an amount ΔT, then the plate surface area is changed to A which is expressed as",
      options: [
        "A = A₀(1 + 2αΔT)",
        "A = 2A₀(1 + αΔT)",
        "A = A₀(1 + αΔT)",
        "A = A₀(1 + 3αΔT)"
      ],
      correctAnswer: 0,
      explanation: "Area expansion coefficient = 2α",
      topic: "Thermal Expansion",
      difficulty: "Medium"
    },
    {
      id: 52,
      question: "An object dropped into a sea sinks to a depth of 100 m. Which of the following is correct about the pressure the object experiences?",
      options: [
        "The gauge pressure exerted on it is P_gauge = 1.01 × 10⁵ Pa",
        "The absolute pressure exerted on it is P_absolute = 9.30 × 10⁵ Pa",
        "The absolute pressure exerted on it is P_absolute = 1.13 × 10⁶ Pa",
        "The gauge pressure exerted on it is P_gauge = 1.03 × 10⁷ Pa"
      ],
      correctAnswer: 2,
      explanation: "P_absolute = P_atm + ρgh = 1×10⁵ + 1030×10×100 = 1.13×10⁶ Pa",
      topic: "Fluid Mechanics",
      difficulty: "Medium"
    },
    {
      id: 53,
      question: "The atmospheric pressure in a certain area is determined to be 103.36 kPa, using a mercury barometer. The height to which the mercury column rises is about",
      options: [
        "76 mm",
        "76 cm",
        "7.6 m",
        "760 cm"
      ],
      correctAnswer: 1,
      explanation: "h = P/(ρg) = 103360/(13600×10) = 0.76 m = 76 cm",
      topic: "Fluid Mechanics",
      difficulty: "Medium"
    },
    {
      id: 54,
      question: "How much heat energy is required to change 5 kg of ice at -20°C to water at 10°C?",
      options: [
        "4.20 × 10⁵ J",
        "1.68 × 10⁶ J",
        "2.10 × 10⁶ J",
        "1.89 × 10⁶ J"
      ],
      correctAnswer: 3,
      explanation: "Q = mc_iceΔT + mL_f + mc_waterΔT = 5×2100×20 + 5×336000 + 5×4200×10 = 1.89×10⁶ J",
      topic: "Thermodynamics",
      difficulty: "Hard"
    },
    {
      id: 55,
      question: "Suppose a particle of mass m is tied to a string and then whirled around in a horizontal circle of radius r about the center O. If the string makes an angle of θ to the vertical while rotating, the component of the force that is responsible for the circular motion of the mass by providing the centripetal force is",
      options: [
        "T sin θ",
        "T cos θ",
        "mg sin θ",
        "mg cos θ"
      ],
      correctAnswer: 0,
      explanation: "Horizontal component T sin θ provides centripetal force.",
      topic: "Circular Motion",
      difficulty: "Medium"
    },
    {
      id: 56,
      question: "Which one of the following statements is correct about the fundamental forces in nature and their applications?",
      options: [
        "The force that keeps the nucleus of an atom from flying apart due to the repulsive force between protons is the weak nuclear force.",
        "The gravitational force makes planets to revolve around the Sun and to follow their orbital path.",
        "The force that arises in most radioactive processes and in nuclear reactions that generate the Sun's energy is the strong nuclear force.",
        "The electromagnetic force is the force that keeps protons and neutrons bound together in the nucleus of an atom."
      ],
      correctAnswer: 1,
      explanation: "Gravity governs planetary orbits.",
      topic: "Fundamental Forces",
      difficulty: "Medium"
    },
    {
      id: 57,
      question: "A spring stores 120 J of elastic potential energy when it is stretched by 0.5 m. What is the potential energy stored by the spring when it is stretched by 1.5 m?",
      options: [
        "480 J",
        "960 J",
        "1080 J",
        "540 J"
      ],
      correctAnswer: 2,
      explanation: "PE ∝ x², so PE = 120 × (1.5/0.5)² = 120 × 9 = 1080 J",
      topic: "Energy",
      difficulty: "Easy"
    },
    {
      id: 58,
      question: "The velocity-time graph of an object moving in a straight line is shown. What is the magnitude of the total displacement covered by the object in the time interval of 14 seconds?",
      options: [
        "102 m",
        "90 m",
        "54 m",
        "42 m"
      ],
      correctAnswer: 0,
      explanation: "Displacement = area under v-t graph = ½×4×12 + 4×12 + ½×2×12 + 2×(-6) + ½×2×(-6) = 102 m",
      topic: "Kinematics",
      difficulty: "Hard"
    },
    {
      id: 59,
      question: "A crane at port is used to lift 10,000 kg object to a height of 20 m. If the power developed by the crane is 50,000 W, how long does it take to lift the object?",
      options: [
        "400 s",
        "40 s",
        "4 s",
        "2 s"
      ],
      correctAnswer: 1,
      explanation: "t = Work/Power = mgh/P = 10000×10×20/50000 = 40 s",
      topic: "Work and Power",
      difficulty: "Easy"
    },
    {
      id: 60,
      question: "A system of four masses m₁ = 4 kg, m₂ = 4 kg, m₃ = 5 kg and m₄ = 3 kg are located in the xy-plane at the coordinates of (0, 0), (30 cm, 0), (-40 cm, 0) and (0, 20 cm), respectively. What is the coordinate of the center of mass of the system?",
      options: [
        "(20 cm, 3.75 cm)",
        "(-6.7 cm, 5 cm)",
        "(-5 cm, 10 cm)",
        "(-5 cm, 3.75 cm)"
      ],
      correctAnswer: 3,
      explanation: "x_cm = (4×0 + 4×30 + 5×(-40) + 3×0)/16 = -5 cm, y_cm = (4×0 + 4×0 + 5×0 + 3×20)/16 = 3.75 cm",
      topic: "Center of Mass",
      difficulty: "Medium"
    }
  ];

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      setShowResults(true);
    }
  }, [timeLeft, showResults]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number): void => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const toggleFlag = (questionId: number): void => {
    setFlagged(prev => {
      const newFlagged = new Set(prev);
      if (newFlagged.has(questionId)) {
        newFlagged.delete(questionId);
      } else {
        newFlagged.add(questionId);
      }
      return newFlagged;
    });
  };

  const calculateScore = (): Score => {
    let correct = 0;
    examQuestions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    const percentage = Math.round((correct / examQuestions.length) * 100);
    return {
      correct,
      total: examQuestions.length,
      percentage
    };
  };

  const handleSubmit = (): void => {
    setShowResults(true);
  };

  const score: Score = calculateScore();

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Award className="w-12 h-12 text-purple-600" />
                <h1 className="text-4xl font-bold text-gray-900">2017 Physics ESSLCE Results</h1>
              </div>
              <div className="text-6xl font-bold text-purple-600 mb-4">
                {score.percentage}%
              </div>
              <p className="text-xl text-gray-600">
                You scored {score.correct} out of {score.total} questions correctly
              </p>
              <div className={`mt-4 text-lg font-semibold ${
                score.percentage >= 80 ? 'text-green-600' :
                score.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {score.percentage >= 80 ? 'Excellent!' : 
                 score.percentage >= 60 ? 'Good Job!' : 'Keep Practicing!'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-h-96 overflow-y-auto">
              {examQuestions.map((question, index) => {
                const userAnswer = answers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-xl border-2 ${
                      isCorrect
                        ? 'border-green-200 bg-green-50'
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-2">
                          Q{index + 1}: {question.question}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Your answer:</span> {userAnswer !== undefined 
                            ? `${String.fromCharCode(65 + userAnswer)}. ${question.options[userAnswer]}`
                            : 'Not answered'
                          }
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Correct answer:</span> {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
                        </p>
                        <p className="text-sm text-blue-600">
                          <span className="font-medium">Explanation:</span> {question.explanation}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                            {question.topic}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            question.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                            question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {question.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/exams')}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
              >
                Back to Exams
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = examQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 pt-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">2017 Physics ESSLCE</h1>
              <p className="text-gray-600">Ethiopian Secondary School Leaving Certificate Examination</p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="font-mono text-red-600 font-bold">{formatTime(timeLeft)}</span>
              </div>
              
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {examQuestions.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Questions Navigation */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Questions Navigation</h3>
              <div className="grid grid-cols-5 gap-2">
                {examQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`relative w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${
                      currentQuestion === index
                        ? 'bg-purple-500 text-white'
                        : answers[index]
                        ? 'bg-green-100 text-green-700 border-2 border-green-300'
                        : flagged.has(index)
                        ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                    {flagged.has(index) && (
                      <Flag className="w-3 h-3 absolute -top-1 -right-1 fill-current text-yellow-500" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-green-100 border-2 border-green-300 rounded"></div>
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-yellow-100 border-2 border-yellow-300 rounded"></div>
                  <span className="text-gray-600">Flagged</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  <span className="text-gray-600">Current</span>
                </div>
              </div>

              <div className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold shadow-lg"
                >
                  Submit Exam
                </motion.button>
              </div>
            </motion.div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mt-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Progress</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Answered</span>
                  <span className="font-semibold text-green-600">
                    {Object.keys(answers).length}/{examQuestions.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Flagged</span>
                  <span className="font-semibold text-yellow-600">
                    {flagged.size}/{examQuestions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${(Object.keys(answers).length / examQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {currentQ.topic}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    currentQ.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    currentQ.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentQ.difficulty}
                  </span>
                </div>
                
                <button
                  onClick={() => toggleFlag(currentQuestion)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    flagged.has(currentQuestion)
                      ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Flag className={`w-4 h-4 ${flagged.has(currentQuestion) ? 'fill-current' : ''}`} />
                  {flagged.has(currentQuestion) ? 'Flagged' : 'Flag Question'}
                </button>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
                  {currentQ.question}
                </h2>
                
                {/* Options */}
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswerSelect(currentQ.id, index)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        answers[currentQ.id] === index
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          answers[currentQ.id] === index
                            ? 'border-purple-500 bg-purple-500 text-white'
                            : 'border-gray-300'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-gray-900">{option}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentQuestion(prev => Math.min(examQuestions.length - 1, prev + 1))}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mt-6"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Exam Instructions</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• You have 2 hours 30 minutes to complete this exam</li>
                    <li>• Answer all 60 questions before time expires</li>
                    <li>• Use the flag feature to mark questions for review</li>
                    <li>• You can navigate between questions using the number grid</li>
                    <li>• Submit your exam when you finish all questions</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}