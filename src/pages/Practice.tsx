
import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Target, Brain, AlertTriangle, BarChart } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

// Quiz questions for different categories
const quizQuestions: Record<string, QuizQuestion[]> = {
  networking: [
    {
      id: "net-1",
      question: "Which layer of the OSI model handles routing between different networks?",
      options: ["Data Link", "Network", "Transport", "Session"],
      correctAnswer: 1,
      explanation: "The Network layer (Layer 3) is responsible for routing packets between different networks. It uses logical addressing (IP addresses) to determine the optimal path for data to travel."
    },
    {
      id: "net-2",
      question: "What is the primary purpose of a switch in a network?",
      options: [
        "To connect different networks together",
        "To assign IP addresses to devices",
        "To forward data packets between devices on the same network",
        "To translate domain names to IP addresses"
      ],
      correctAnswer: 2,
      explanation: "Switches operate at the Data Link layer and use MAC addresses to forward frames specifically to the intended device on a local network, rather than broadcasting to all devices."
    },
    {
      id: "net-3",
      question: "Which protocol is used to automatically assign IP addresses to devices on a network?",
      options: ["HTTP", "FTP", "DNS", "DHCP"],
      correctAnswer: 3,
      explanation: "Dynamic Host Configuration Protocol (DHCP) automatically assigns IP addresses to devices when they join a network, eliminating the need for manual IP configuration."
    }
  ],
  transmission: [
    {
      id: "trans-1",
      question: "Which transmission medium is immune to electromagnetic interference?",
      options: ["Coaxial cable", "Twisted pair cable", "Fiber optic cable", "Wireless"],
      correctAnswer: 2,
      explanation: "Fiber optic cable transmits data using light pulses through glass or plastic fibers, making it immune to electromagnetic interference that affects copper-based media."
    },
    {
      id: "trans-2",
      question: "What is the primary disadvantage of wireless networking compared to wired options?",
      options: [
        "Higher cost",
        "Susceptibility to interference",
        "Slower installation",
        "Limited compatibility"
      ],
      correctAnswer: 1,
      explanation: "Wireless networks are susceptible to interference from various sources including walls, other wireless devices, and electronic equipment, which can impact reliability and performance."
    },
    {
      id: "trans-3",
      question: "Which factor most significantly affects the maximum distance for twisted pair Ethernet cables?",
      options: ["Cable thickness", "Signal attenuation", "Number of twists", "Cable color"],
      correctAnswer: 1,
      explanation: "Signal attenuation (loss of signal strength over distance) is the primary factor that limits the maximum length of twisted pair cables, typically to about 100 meters for standard Ethernet."
    }
  ],
  services: [
    {
      id: "serv-1",
      question: "What is the primary function of DNS in a network?",
      options: [
        "Assigning IP addresses",
        "Translating domain names to IP addresses",
        "Encrypting data transmissions",
        "Routing data packets"
      ],
      correctAnswer: 1,
      explanation: "Domain Name System (DNS) translates human-readable domain names (like example.com) into IP addresses that computers use to identify each other on the network."
    },
    {
      id: "serv-2",
      question: "Which port is commonly used for HTTPS traffic?",
      options: ["21", "25", "80", "443"],
      correctAnswer: 3,
      explanation: "Port 443 is the standard port for HTTPS (HTTP Secure) traffic, which provides encrypted communication and secure identification of a network web server."
    },
    {
      id: "serv-3",
      question: "What protocol is primarily used for sending email?",
      options: ["SMTP", "POP3", "IMAP", "FTP"],
      correctAnswer: 0,
      explanation: "Simple Mail Transfer Protocol (SMTP) is used for sending email messages between servers. Clients typically use SMTP only for sending messages to a mail server for relaying."
    }
  ]
};

const Practice = () => {
  const [activeTab, setActiveTab] = useState("networking");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState<Record<string, number>>({
    networking: 0,
    transmission: 0,
    services: 0
  });
  const [attempts, setAttempts] = useState<Record<string, number>>({
    networking: 0,
    transmission: 0,
    services: 0
  });
  
  const currentQuestion = quizQuestions[activeTab][currentQuestionIndex];
  
  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    // Update score and attempts
    setAttempts(prev => ({
      ...prev,
      [activeTab]: prev[activeTab] + 1
    }));
    
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(prev => ({
        ...prev,
        [activeTab]: prev[activeTab] + 1
      }));
      
      toast({
        title: "Correct!",
        description: currentQuestion.explanation,
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: currentQuestion.explanation,
        variant: "destructive",
      });
    }
  };
  
  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    
    if (currentQuestionIndex < quizQuestions[activeTab].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of quiz for this category
      toast({
        title: "Quiz Completed!",
        description: `You scored ${score[activeTab]} out of ${quizQuestions[activeTab].length} in this category.`,
        variant: "default",
      });
      
      // Reset to first question
      setCurrentQuestionIndex(0);
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };
  
  // Calculate progress percentage for each category
  const getProgressPercentage = (category: string) => {
    const totalQuestions = quizQuestions[category].length;
    return attempts[category] > 0
      ? (score[category] / totalQuestions) * 100
      : 0;
  };
  
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-netsim-dark mb-6 tracking-tight">Practice & Assessment</h1>
          <p className="text-xl text-slate-600">
            Test your knowledge of networking concepts with interactive quizzes and challenges.
          </p>
        </div>
        
        {/* Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Network Basics</CardTitle>
                <Target className="h-5 w-5 text-netsim-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{Math.round(getProgressPercentage("networking"))}%</span>
                </div>
                <Progress value={getProgressPercentage("networking")} className="h-2" />
              </div>
              <p className="text-sm text-slate-500">
                {attempts.networking > 0 
                  ? `Score: ${score.networking}/${quizQuestions.networking.length}` 
                  : "Not started yet"}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Transmission Media</CardTitle>
                <BarChart className="h-5 w-5 text-netsim-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{Math.round(getProgressPercentage("transmission"))}%</span>
                </div>
                <Progress value={getProgressPercentage("transmission")} className="h-2" />
              </div>
              <p className="text-sm text-slate-500">
                {attempts.transmission > 0 
                  ? `Score: ${score.transmission}/${quizQuestions.transmission.length}` 
                  : "Not started yet"}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">TCP/IP Services</CardTitle>
                <Brain className="h-5 w-5 text-netsim-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{Math.round(getProgressPercentage("services"))}%</span>
                </div>
                <Progress value={getProgressPercentage("services")} className="h-2" />
              </div>
              <p className="text-sm text-slate-500">
                {attempts.services > 0 
                  ? `Score: ${score.services}/${quizQuestions.services.length}` 
                  : "Not started yet"}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Quiz Interface */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Quiz Challenges</h2>
          
          <Tabs defaultValue="networking" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="networking">Network Basics</TabsTrigger>
              <TabsTrigger value="transmission">Transmission Media</TabsTrigger>
              <TabsTrigger value="services">TCP/IP Services</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-slate-400 mr-2" />
                    <span className="text-sm text-slate-500">Question {currentQuestionIndex + 1} of {quizQuestions[activeTab].length}</span>
                  </div>
                  
                  <div className="text-sm text-slate-500">
                    Score: {score[activeTab]}/{attempts[activeTab]}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-6">{currentQuestion.question}</h3>
                  
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <div 
                        key={index}
                        className={`
                          p-4 rounded-lg border cursor-pointer transition-colors
                          ${selectedOption === index && index === currentQuestion.correctAnswer 
                            ? 'bg-green-50 border-green-200' 
                            : selectedOption === index 
                              ? 'bg-red-50 border-red-200' 
                              : isAnswered && index === currentQuestion.correctAnswer
                                ? 'bg-green-50 border-green-200'
                                : 'bg-white border-slate-200 hover:border-slate-300'
                          }
                        `}
                        onClick={() => handleOptionSelect(index)}
                      >
                        <div className="flex items-start">
                          <div className={`
                            flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5
                            ${selectedOption === index && index === currentQuestion.correctAnswer 
                              ? 'bg-green-500 text-white' 
                              : selectedOption === index 
                                ? 'bg-red-500 text-white' 
                                : isAnswered && index === currentQuestion.correctAnswer
                                  ? 'bg-green-500 text-white'
                                  : 'bg-slate-100 text-slate-600'
                            }
                          `}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <div>{option}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {isAnswered && (
                  <div className={`
                    p-4 rounded-lg mb-6
                    ${selectedOption === currentQuestion.correctAnswer 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                    }
                  `}>
                    <div className="flex items-start">
                      {selectedOption === currentQuestion.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-medium mb-1">
                          {selectedOption === currentQuestion.correctAnswer 
                            ? 'Correct!' 
                            : 'Incorrect'
                          }
                        </p>
                        <p className="text-sm">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleNextQuestion}
                    disabled={!isAnswered}
                  >
                    {currentQuestionIndex < quizQuestions[activeTab].length - 1 
                      ? 'Next Question' 
                      : 'Finish Quiz'
                    }
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Learning Resources */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-6">Learning Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Basics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Review fundamental networking concepts and how data travels through networks.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/learn/network-communication" className="w-full">
                  <Button variant="outline" className="w-full">Go to Learning Module</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Transmission Media</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Explore different types of transmission media and their characteristics.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/learn/transmission-media" className="w-full">
                  <Button variant="outline" className="w-full">Go to Learning Module</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>TCP/IP Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Learn about essential network services like DNS, DHCP, and HTTP.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/learn/tcp-ip-services" className="w-full">
                  <Button variant="outline" className="w-full">Go to Learning Module</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
