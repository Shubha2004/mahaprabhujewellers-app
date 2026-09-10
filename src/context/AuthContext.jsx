import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'Password8989$$',
};

const INITIAL_USERS = [];

export const AuthProvider = ({ children }) => {
  // Admin auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('mpj_admin_authenticated') === 'true';
    } catch (e) {
      return false;
    }
  });

  // Customer auth state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('mpj_current_user');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        // Exclude legacy mock user
        if (parsed && parsed.id !== 'usr-01' && parsed.id !== 'usr-02') {
          return parsed;
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  });

  // Real registered users database in localStorage
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('mpj_real_customers_v1');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Exclude any legacy mock user IDs
          return parsed.filter(u => u.id !== 'usr-01' && u.id !== 'usr-02' && !u.email?.includes('example.com'));
        }
      }
      return [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mpj_real_customers_v1', JSON.stringify(users));
    } catch (e) {
      console.warn('Unable to save real customers to localStorage', e);
    }
  }, [users]);

  // Admin login function strictly checking hardcoded credentials
  const adminLogin = (username, password) => {
    const cleanUser = username?.trim();
    const cleanPass = password?.trim();
    if (cleanUser === ADMIN_CREDENTIALS.username && cleanPass === ADMIN_CREDENTIALS.password) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('mpj_admin_authenticated', 'true');
      return { success: true, message: 'Admin logged in successfully' };
    }
    return { 
      success: false, 
      message: 'Invalid Admin credentials. Check username & password.' 
    };
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('mpj_admin_authenticated');
  };

  // Customer registration
  const customerRegister = ({ name, email, password, phone, address, city, pincode }) => {
    const existing = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      phone: phone?.trim() || '',
      address: address?.trim() || '',
      city: city?.trim() || '',
      pincode: pincode?.trim() || '',
      joinedDate: new Date().toISOString().split('T')[0],
      ordersCount: 0,
      totalSpent: 0
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    localStorage.setItem('mpj_current_user', JSON.stringify(newUser));
    return { success: true, user: newUser, message: 'Registration successful! Welcome to Maha Prabhu Jewellers.' };
  };

  // Customer login
  const customerLogin = (email, password) => {
    const user = users.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password.trim()
    );

    if (user) {
      setCurrentUser(user);
      localStorage.setItem('mpj_current_user', JSON.stringify(user));
      return { success: true, user, message: `Welcome back, ${user.name}!` };
    }

    return { success: false, message: 'Invalid email or password.' };
  };

  const customerLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mpj_current_user');
  };

  // Record customer from order placement (real in-store or online)
  const recordCustomerOrder = (customerData, orderTotal = 0) => {
    setUsers(prev => {
      const email = (customerData.customerEmail || '').trim().toLowerCase();
      const phone = (customerData.customerPhone || '').trim();

      const existingIdx = prev.findIndex(u => 
        (email && u.email && u.email.toLowerCase() === email) || 
        (phone && u.phone && u.phone === phone)
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          name: customerData.customerName || updated[existingIdx].name,
          phone: phone || updated[existingIdx].phone,
          address: customerData.shippingAddress || updated[existingIdx].address,
          city: customerData.city || updated[existingIdx].city,
          ordersCount: (updated[existingIdx].ordersCount || 0) + 1,
          totalSpent: (updated[existingIdx].totalSpent || 0) + (orderTotal || 0)
        };
        return updated;
      } else {
        const newUser = {
          id: `cust-${Date.now()}`,
          name: customerData.customerName || 'Store Customer',
          email: email || `${phone.replace(/\D/g, '') || Date.now()}@store.mahaprabhujewellers.com`,
          phone: phone || '',
          address: customerData.shippingAddress || '',
          city: customerData.city || 'Tarakeshwar, West Bengal',
          joinedDate: new Date().toISOString().split('T')[0],
          ordersCount: 1,
          totalSpent: orderTotal || 0
        };
        return [newUser, ...prev];
      }
    });
  };

  // Manual customer registration by store admin
  const addCustomerManually = ({ name, phone, email, city, address }) => {
    const newUser = {
      id: `cust-${Date.now()}`,
      name: name.trim(),
      phone: phone?.trim() || '',
      email: email?.trim().toLowerCase() || `${(phone?.trim() || Date.now()).toString().replace(/\D/g, '')}@store.mahaprabhujewellers.com`,
      city: city?.trim() || 'Tarakeshwar, West Bengal',
      address: address?.trim() || '',
      joinedDate: new Date().toISOString().split('T')[0],
      ordersCount: 0,
      totalSpent: 0
    };
    setUsers(prev => [newUser, ...prev]);
    return newUser;
  };

  // Delete customer record (admin)
  const deleteCustomer = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        currentUser,
        users,
        customerLogin,
        customerRegister,
        customerLogout,
        recordCustomerOrder,
        addCustomerManually,
        deleteCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
