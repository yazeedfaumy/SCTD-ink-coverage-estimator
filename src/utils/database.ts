/**
 * Database Architecture for Ink Coverage Estimator
 * 
 * This file defines the database schema and operations for the application.
 * In a production environment, this would connect to SQLite or another database.
 * For this demo, we're using localStorage as a simple data store.
 */
// Database Schema
interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would be hashed
  createdAt: string;
  settings: UserSettings;
}
interface UserSettings {
  language: string;
  defaultCartridges: {
    mode: 'separate' | 'combined';
    separate?: {
      cyan: {
        price: number;
        yield: number;
      };
      magenta: {
        price: number;
        yield: number;
      };
      yellow: {
        price: number;
        yield: number;
      };
      key: {
        price: number;
        yield: number;
      };
    };
    combined?: {
      color: {
        price: number;
        yield: number;
      };
      key: {
        price: number;
        yield: number;
      };
    };
  };
}
interface AnalyzedFile {
  id: string;
  userId: string;
  fileName: string;
  fileSize: number;
  pageCount: number;
  contentTypes: string[];
  createdAt: string;
  results: AnalysisResults;
}
interface AnalysisResults {
  pages: {
    [pageNumber: string]: {
      color: {
        cyan: number;
        magenta: number;
        yellow: number;
        key: number;
        total: number;
      };
      greyscale: {
        key: number;
        total: number;
      };
    };
  };
}
interface CostCalculation {
  id: string;
  fileId: string;
  userId: string;
  createdAt: string;
  mode: 'separate' | 'combined';
  cartridges: {
    separate?: {
      cyan: {
        price: number;
        yield: number;
      };
      magenta: {
        price: number;
        yield: number;
      };
      yellow: {
        price: number;
        yield: number;
      };
      key: {
        price: number;
        yield: number;
      };
    };
    combined?: {
      color: {
        price: number;
        yield: number;
      };
      key: {
        price: number;
        yield: number;
      };
    };
  };
  results: {
    [pageNumber: string]: {
      color: {
        total: number;
      };
      greyscale: {
        total: number;
      };
    };
  };
}
interface Report {
  id: string;
  userId: string;
  fileId: string;
  costCalculationId?: string; // Optional if no cost calculation was done
  createdAt: string;
  type: 'analysis' | 'cost' | 'full';
  format: 'pdf' | 'excel' | 'png';
  downloadUrl: string;
}
// Mock database operations
export const db = {
  users: {
    create: (userData: Omit<User, 'id' | 'createdAt' | 'settings'>) => {
      const id = `user_${Date.now()}`;
      const user: User = {
        id,
        ...userData,
        createdAt: new Date().toISOString(),
        settings: {
          language: 'en',
          defaultCartridges: {
            mode: 'separate',
            separate: {
              cyan: {
                price: 25,
                yield: 1000
              },
              magenta: {
                price: 25,
                yield: 1000
              },
              yellow: {
                price: 25,
                yield: 1000
              },
              key: {
                price: 20,
                yield: 1500
              }
            }
          }
        }
      };
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      return user;
    },
    findByEmail: (email: string) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      return users.find((user: User) => user.email === email) || null;
    },
    updateSettings: (userId: string, settings: UserSettings) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((user: User) => user.id === userId);
      if (userIndex >= 0) {
        users[userIndex].settings = settings;
        localStorage.setItem('users', JSON.stringify(users));
        return users[userIndex];
      }
      return null;
    }
  },
  files: {
    create: (fileData: Omit<AnalyzedFile, 'id' | 'createdAt'>) => {
      const id = `file_${Date.now()}`;
      const file: AnalyzedFile = {
        id,
        ...fileData,
        createdAt: new Date().toISOString()
      };
      const files = JSON.parse(localStorage.getItem('files') || '[]');
      files.push(file);
      localStorage.setItem('files', JSON.stringify(files));
      return file;
    },
    findByUserId: (userId: string) => {
      const files = JSON.parse(localStorage.getItem('files') || '[]');
      return files.filter((file: AnalyzedFile) => file.userId === userId);
    },
    findById: (id: string) => {
      const files = JSON.parse(localStorage.getItem('files') || '[]');
      return files.find((file: AnalyzedFile) => file.id === id) || null;
    }
  },
  costCalculations: {
    create: (calcData: Omit<CostCalculation, 'id' | 'createdAt'>) => {
      const id = `calc_${Date.now()}`;
      const calculation: CostCalculation = {
        id,
        ...calcData,
        createdAt: new Date().toISOString()
      };
      const calculations = JSON.parse(localStorage.getItem('costCalculations') || '[]');
      calculations.push(calculation);
      localStorage.setItem('costCalculations', JSON.stringify(calculations));
      return calculation;
    },
    findByFileId: (fileId: string) => {
      const calculations = JSON.parse(localStorage.getItem('costCalculations') || '[]');
      return calculations.filter((calc: CostCalculation) => calc.fileId === fileId);
    }
  },
  reports: {
    create: (reportData: Omit<Report, 'id' | 'createdAt' | 'downloadUrl'>) => {
      const id = `report_${Date.now()}`;
      const report: Report = {
        id,
        ...reportData,
        createdAt: new Date().toISOString(),
        downloadUrl: `#mock-download-${id}` // Mock URL
      };
      const reports = JSON.parse(localStorage.getItem('reports') || '[]');
      reports.push(report);
      localStorage.setItem('reports', JSON.stringify(reports));
      return report;
    },
    findByUserId: (userId: string) => {
      const reports = JSON.parse(localStorage.getItem('reports') || '[]');
      return reports.filter((report: Report) => report.userId === userId);
    }
  }
};
// Initialize database if empty
export function initializeDatabase() {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', '[]');
  }
  if (!localStorage.getItem('files')) {
    localStorage.setItem('files', '[]');
  }
  if (!localStorage.getItem('costCalculations')) {
    localStorage.setItem('costCalculations', '[]');
  }
  if (!localStorage.getItem('reports')) {
    localStorage.setItem('reports', '[]');
  }
}