import React from 'react'
import { motion } from 'framer-motion'
import { useAuthContext } from '@/components/auth/AuthProvider'
import { Navbar } from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Brain, Clock, TrendingUp, Upload, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useAuthContext()

  const stats = [
    {
      title: 'Documents Analyzed',
      value: '12',
      icon: FileText,
      change: '+2 this week',
      color: 'text-primary'
    },
    {
      title: 'Health Score',
      value: '85/100',
      icon: TrendingUp,
      change: '+5 points',
      color: 'text-accent'
    },
    {
      title: 'AI Insights',
      value: '24',
      icon: Brain,
      change: '+8 new',
      color: 'text-warning'
    },
    {
      title: 'Processing Time',
      value: '45s',
      icon: Clock,
      change: 'Average',
      color: 'text-muted-foreground'
    }
  ]

  const recentDocuments = [
    {
      id: 1,
      name: 'Blood Test Results - Jan 2024',
      type: 'Lab Report',
      status: 'completed',
      date: '2024-01-15',
      insights: 3
    },
    {
      id: 2,
      name: 'Prescription - Hypertension Meds',
      type: 'Prescription',
      status: 'completed',
      date: '2024-01-10',
      insights: 2
    },
    {
      id: 3,
      name: 'X-Ray Report - Chest',
      type: 'Imaging',
      status: 'processing',
      date: '2024-01-08',
      insights: 0
    }
  ]

  return (
    <div className="min-h-screen cosmic-bg">
      <div className="absolute inset-0 stars-pattern opacity-30"></div>
      
      <Navbar />
      
      <main className="pt-24 relative z-10">
        <div className="medical-container">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome back, {user?.user_metadata?.full_name || user?.user_metadata?.name || 'User'}!
            </h1>
            <p className="text-xl text-muted-foreground">
              Here's your health analysis dashboard
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Card className="card-medical">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {stat.value}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {stat.change}
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Documents */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="card-medical">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <span>Recent Documents</span>
                  </CardTitle>
                  <Link to="/upload">
                    <Button className="btn-medical-primary">
                      <Plus className="w-4 h-4 mr-2" />
                      Upload New
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDocuments.map((doc, index) => (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{doc.name}</h4>
                            <p className="text-sm text-muted-foreground">{doc.type} • {doc.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`
                            px-2 py-1 rounded-full text-xs font-medium
                            ${doc.status === 'completed' 
                              ? 'status-normal' 
                              : doc.status === 'processing'
                              ? 'status-warning'
                              : 'bg-muted text-muted-foreground'
                            }
                          `}>
                            {doc.status}
                          </div>
                          {doc.insights > 0 && (
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Brain className="w-3 h-3" />
                              <span>{doc.insights} insights</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="card-medical">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link to="/upload">
                    <Button className="w-full btn-medical-primary">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Document
                    </Button>
                  </Link>
                  <Button className="w-full btn-medical-secondary">
                    <Brain className="w-4 h-4 mr-2" />
                    View All Insights
                  </Button>
                  <Button className="w-full btn-medical-secondary">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Health Trends
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-medical">
                <CardHeader>
                  <CardTitle>Health Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Overall Health</span>
                      <span className="status-normal">Good</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Risk Factors</span>
                      <span className="status-warning">2 Moderate</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last Analysis</span>
                      <span className="text-sm text-foreground">2 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard