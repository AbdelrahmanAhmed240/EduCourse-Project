import { createContext, useState, useContext, useEffect } from 'react';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  // Helper to get current user ID
  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return user?.result?._id || user?.result?.googleId || "guest";
  };

  const [course, setCourse] = useState(() => {
    const userId = getUserId();
    const saved = localStorage.getItem(`course_${userId}`); // Unique key per user
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);

  // Sync with LocalStorage whenever the course OR the user changes
  useEffect(() => {
    const userId = getUserId();
    if (course) {
      localStorage.setItem(`course_${userId}`, JSON.stringify(course));
    }
  }, [course]);

  // IMPORTANT: Clear the course from state if the user switches/logs out
  // You can call this during your logout function
  const updateCourse = (newCourse) => setCourse(newCourse);
  
  const clearCourse = () => {
    setCourse(null);
    // We don't necessarily want to delete from localStorage 
    // just in case they log back in, but we clear it from the current view.
  };

  return (
    <CourseContext.Provider value={{ course, updateCourse, clearCourse, loading, setLoading }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => useContext(CourseContext);