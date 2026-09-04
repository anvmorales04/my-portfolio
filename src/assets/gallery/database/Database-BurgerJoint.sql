DROP TABLE orders_items CASCADE CONSTRAINTS;
DROP TABLE orders CASCADE CONSTRAINTS;
DROP TABLE menu CASCADE CONSTRAINTS;
DROP TABLE ingredients CASCADE CONSTRAINTS;
DROP TABLE supplier CASCADE CONSTRAINTS;
DROP TABLE inventory CASCADE CONSTRAINTS;
DROP TABLE order_status CASCADE CONSTRAINTS;
DROP TABLE staff CASCADE CONSTRAINTS;
DROP TABLE customers CASCADE CONSTRAINTS;
DROP TABLE menu_breakdown CASCADE CONSTRAINTS;



CREATE TABLE Supplier (
    Supplier_id NUMBER CONSTRAINT Supplier_pk PRIMARY KEY,
    Supplier_name VARCHAR2(50),
    Supplier_location VARCHAR2(50)
);

CREATE TABLE Inventory (
    Inventory_id NUMBER CONSTRAINT Inventory_PK PRIMARY KEY,
    Inventory_name VARCHAR2(50),
    Package_Amount NUMBER,
    Arrival_Date DATE,
    Expiry_Date DATE,
    Supplier_ID NUMBER,
    CONSTRAINT fk_Inventory
        FOREIGN KEY (Supplier_ID)
        REFERENCES Supplier(Supplier_ID),
    CONSTRAINT chk_inv_date CHECK (Expiry_Date > Arrival_Date)
);


CREATE TABLE Ingredients (
    Ingredients_id NUMBER CONSTRAINT Ingredients_PK PRIMARY KEY,
    Ingredients_name VARCHAR2(50),
    Inventory_Amount NUMBER,
    Category_id NUMBER,
    Inventory_id NUMBER,
    CONSTRAINT fk_Ingredients
        FOREIGN KEY (Inventory_id)
        REFERENCES Inventory(Inventory_id)
);


CREATE TABLE Menu (
    Item_id NUMBER CONSTRAINT Menu_PK PRIMARY KEY,
    Item_name VARCHAR2(50),
    Item_Price NUMBER,
    Item_Description VARCHAR2(200)
);

CREATE TABLE Menu_Breakdown (
    Ingredients_id NUMBER,
    Item_id NUMBER,
    CONSTRAINT fk_Menu_Breakdown
        FOREIGN KEY (Ingredients_id)
        REFERENCES Ingredients(Ingredients_id),
    CONSTRAINT fk_Menu_Breakdown1
        FOREIGN KEY (Item_id)
        REFERENCES Menu (Item_id)
);


CREATE TABLE Customers (
    Customer_id NUMBER CONSTRAINT Customers_PK PRIMARY KEY,
    Customer_name VARCHAR2(50),
    isSenior NUMBER(1) CHECK (isSenior IN (0, 1)),
    isPWD NUMBER(1) CHECK (isPWD IN (0, 1))
);

CREATE TABLE Staff (
    Staff_id NUMBER CONSTRAINT Staff_pk PRIMARY KEY,
    Staff_Firstname VARCHAR2(50),
    Staff_Lastname VARCHAR2(50),
    Staff_Middlename VARCHAR2(50),
    Staff_Fullname VARCHAR2(50),
    Staff_Phone VARCHAR2(50),
    Status NUMBER(1) CHECK (Status IN (0, 1)),
    Hire_Date DATE,
    Manager_id NUMBER
);

CREATE TABLE Order_Status (
    Status_id NUMBER CONSTRAINT Order_Status_PK PRIMARY KEY,
    Status_name VARCHAR2(50)
);

CREATE TABLE Orders (
    Order_id NUMBER CONSTRAINT Orders PRIMARY KEY,
    Order_Date DATE default sysdate,
    Order_Price Number,
    Discount Number,
    Total Number,
    Status_id NUMBER,
    Staff_id NUMBER,
    Customer_id NUMBER,
    CONSTRAINT fk_Orders
        FOREIGN KEY (Staff_id)
        REFERENCES Staff(Staff_id),
    CONSTRAINT fk_Orders1
        FOREIGN KEY (Status_id)
        REFERENCES Order_Status(Status_id),
    CONSTRAINT fk_Orders2
        FOREIGN KEY (Customer_id)
        REFERENCES Customers(Customer_id)
);

CREATE TABLE Orders_Items(
    Order_Item_Quantity Number,
    Order_Item_Amount Number,
    Item_id NUMBER,
    Order_ID NUMBER,
    CONSTRAINT fk_Orders_Items
        FOREIGN KEY (Item_id)
        REFERENCES Menu(Item_id),
    CONSTRAINT fk_Orders_Items1
        FOREIGN KEY (ORDER_ID)
        REFERENCES Orders(ORDER_ID)
);


--supplier
INSERT INTO Supplier (Supplier_id, Supplier_name, Supplier_location) VALUES (1, 'FreshFarm Produce', 'Quezon City');
INSERT INTO Supplier (Supplier_id, Supplier_name, Supplier_location) VALUES (2, 'Burger Essentials Co.', 'Makati');
INSERT INTO Supplier (Supplier_id, Supplier_name, Supplier_location) VALUES (3, 'Daily Dairy Supply', 'Taguig');
INSERT INTO Supplier (Supplier_id, Supplier_name, Supplier_location) VALUES (5, 'Bun Bakers Inc.', 'Marikina');
INSERT INTO Supplier (Supplier_id, Supplier_name, Supplier_location) VALUES (7, 'Soda Pop Distributors', 'Caloocan');
INSERT INTO Supplier (Supplier_id, Supplier_name, Supplier_location) VALUES (10, 'Frozen Goods Hub', 'Las Piñas');
INSERT INTO Supplier (Supplier_id, Supplier_name, Supplier_location) VALUES (13, 'Perfect Patties Ltd.', 'Valenzuela');
INSERT INTO Supplier (Supplier_id, Supplier_name, Supplier_location) VALUES (18, 'Happy Condiments', 'Santa Rosa');
INSERT INTO Supplier (Supplier_id, Supplier_name, Supplier_location) VALUES (19, 'Quality Cheese Depot', 'Imus');
INSERT INTO Supplier (Supplier_id, Supplier_name, Supplier_location) VALUES (20, 'PantryPro Supplies', 'Bacoor');

-- inventory
INSERT INTO Inventory (Inventory_id, Inventory_name, Package_Amount, Arrival_Date, Expiry_Date, Supplier_ID)
VALUES (1, 'Burger Buns', 100, TO_DATE('2025-05-20', 'YYYY-MM-DD'), TO_DATE('2025-06-05', 'YYYY-MM-DD'), 5);

INSERT INTO Inventory (Inventory_id, Inventory_name, Package_Amount, Arrival_Date, Expiry_Date, Supplier_ID)
VALUES (2, 'Beef Patties', 200, TO_DATE('2025-05-21', 'YYYY-MM-DD'), TO_DATE('2025-06-10', 'YYYY-MM-DD'), 13);

INSERT INTO Inventory (Inventory_id, Inventory_name, Package_Amount, Arrival_Date, Expiry_Date, Supplier_ID)
VALUES (3, 'Lettuce', 50, TO_DATE('2025-05-22', 'YYYY-MM-DD'), TO_DATE('2025-05-30', 'YYYY-MM-DD'), 1);

INSERT INTO Inventory (Inventory_id, Inventory_name, Package_Amount, Arrival_Date, Expiry_Date, Supplier_ID)
VALUES (4, 'Tomatoes', 60, TO_DATE('2025-05-22', 'YYYY-MM-DD'), TO_DATE('2025-05-30', 'YYYY-MM-DD'), 1);

INSERT INTO Inventory (Inventory_id, Inventory_name, Package_Amount, Arrival_Date, Expiry_Date, Supplier_ID)
VALUES (5, 'Cheddar Cheese', 80, TO_DATE('2025-05-21', 'YYYY-MM-DD'), TO_DATE('2025-06-15', 'YYYY-MM-DD'), 19);

INSERT INTO Inventory (Inventory_id, Inventory_name, Package_Amount, Arrival_Date, Expiry_Date, Supplier_ID)
VALUES (6, 'Burger Sauce', 40, TO_DATE('2025-05-20', 'YYYY-MM-DD'), TO_DATE('2025-07-01', 'YYYY-MM-DD'), 18);

INSERT INTO Inventory (Inventory_id, Inventory_name, Package_Amount, Arrival_Date, Expiry_Date, Supplier_ID)
VALUES (7, 'Fries', 150, TO_DATE('2025-05-23', 'YYYY-MM-DD'), TO_DATE('2025-06-15', 'YYYY-MM-DD'), 10);

INSERT INTO Inventory (Inventory_id, Inventory_name, Package_Amount, Arrival_Date, Expiry_Date, Supplier_ID)
VALUES (8, 'Soft Drinks (Cans)', 300, TO_DATE('2025-05-23', 'YYYY-MM-DD'), TO_DATE('2025-09-23', 'YYYY-MM-DD'), 7);

INSERT INTO Inventory (Inventory_id, Inventory_name, Package_Amount, Arrival_Date, Expiry_Date, Supplier_ID)
VALUES (9, 'Vanilla Ice Cream (Tubs)', 80, TO_DATE('2025-05-23', 'YYYY-MM-DD'), TO_DATE('2025-07-23', 'YYYY-MM-DD'), 10);

INSERT INTO Inventory (Inventory_id, Inventory_name, Package_Amount, Arrival_Date, Expiry_Date, Supplier_ID)
VALUES (10, 'Spaghetti Noodles', 100, TO_DATE('2025-05-22', 'YYYY-MM-DD'), TO_DATE('2025-08-01', 'YYYY-MM-DD'), 20);

INSERT INTO Inventory (Inventory_id, Inventory_name, Package_Amount, Arrival_Date, Expiry_Date, Supplier_ID)
VALUES (11, 'Spaghetti Sauce', 100, TO_DATE('2025-05-22', 'YYYY-MM-DD'), TO_DATE('2025-08-01', 'YYYY-MM-DD'), 18);


--ingredients
INSERT INTO Ingredients VALUES (1,  'Burger Bun',           100, 1,  1);
INSERT INTO Ingredients VALUES (2,  'Beef Patty',           200, 1,  2);
INSERT INTO Ingredients VALUES (3,  'Lettuce Leaf',          50, 1,  3);
INSERT INTO Ingredients VALUES (4,  'Tomato Slice',          60, 1,  4);
INSERT INTO Ingredients VALUES (5,  'Cheddar Cheese Slice',  80, 1,  5);
INSERT INTO Ingredients VALUES (6,  'Burger Sauce',          40, 1,  6);
INSERT INTO Ingredients VALUES (7,  'French Fries',         150, 2,  7);
INSERT INTO Ingredients VALUES (8,  'Soft Drink Can',       300, 3,  8);
INSERT INTO Ingredients VALUES (9,  'Vanilla Ice Cream',     80, 4,  9);
INSERT INTO Ingredients VALUES (10, 'Spaghetti Noodles',    100, 5, 10);
INSERT INTO Ingredients VALUES (11, 'Spaghetti Sauce',      100, 5, 11);

--Customer
INSERT INTO Customers VALUES (1, 'Juan Dela Cruz', 1, 0);
INSERT INTO Customers VALUES (2, 'Maria Santos', 0, 1);
INSERT INTO Customers VALUES (3, 'Jose Rizal', 1, 1);
INSERT INTO Customers VALUES (4, 'Ana Reyes', 0, 0);
INSERT INTO Customers VALUES (5, 'Pedro Gonzales', 0, 0);


--Staff
INSERT INTO Staff VALUES (101, 'Carlos', 'Lopez', 'M.', 'Carlos M. Lopez', '09171234567', 1, TO_DATE('2020-01-15', 'YYYY-MM-DD'), NULL);
INSERT INTO Staff VALUES (102, 'Elena', 'Garcia', 'R.', 'Elena R. Garcia', '09281234567', 1, TO_DATE('2021-03-10', 'YYYY-MM-DD'), 101);
INSERT INTO Staff VALUES (103, 'Miguel', 'Torres', 'D.', 'Miguel D. Torres', '09391234567', 1, TO_DATE('2022-06-05', 'YYYY-MM-DD'), 101);
INSERT INTO Staff VALUES (104, 'Isabel', 'Ramos', 'G.', 'Isabel G. Ramos', '09481234567', 0, TO_DATE('2023-01-20', 'YYYY-MM-DD'), 101);
INSERT INTO Staff VALUES (105, 'Rafael', 'Cruz', 'L.', 'Rafael L. Cruz', '09581234567', 1, TO_DATE('2023-09-12', 'YYYY-MM-DD'), 102);


--Order Status
INSERT INTO Order_Status VALUES (1, 'Pending');
INSERT INTO Order_Status VALUES (2, 'Preparing');
INSERT INTO Order_Status VALUES (3, 'Completed');
INSERT INTO Order_Status VALUES (4, 'Cancelled');

--menu
INSERT INTO Menu (Item_id, Item_name, Item_Price, Item_Description) 
VALUES (1, 'Classic Beef Burger', 120, 'Juicy beef patty with lettuce, tomato, and special sauce');

INSERT INTO Menu (Item_id, Item_name, Item_Price, Item_Description) 
VALUES (2, 'Cheese Burger', 135, 'Beef patty topped with cheddar cheese, lettuce, and pickles');

INSERT INTO Menu (Item_id, Item_name, Item_Price, Item_Description) 
VALUES (3, 'Burger with Drinks', 160, 'Classic beef burger served with a soft drink');

INSERT INTO Menu (Item_id, Item_name, Item_Price, Item_Description) 
VALUES (4, 'Burger with Fries', 170, 'Classic beef burger served with crispy fries');

INSERT INTO Menu (Item_id, Item_name, Item_Price, Item_Description) 
VALUES (5, 'Burger with Fries and Drinks', 200, 'Classic beef burger with fries and soft drink combo');

INSERT INTO Menu (Item_id, Item_name, Item_Price, Item_Description) 
VALUES (6, 'Fries', 70, 'Crispy golden fries');

INSERT INTO Menu (Item_id, Item_name, Item_Price, Item_Description) 
VALUES (7, 'Fries and Drink', 110, 'Crispy fries served with a soft drink');

INSERT INTO Menu (Item_id, Item_name, Item_Price, Item_Description) 
VALUES (8, 'Drink', 50, 'Refreshing soft drink');

INSERT INTO Menu (Item_id, Item_name, Item_Price, Item_Description) 
VALUES (9, 'Ice Cream', 80, 'Choice of vanilla, chocolate, or strawberry ice cream');

INSERT INTO Menu (Item_id, Item_name, Item_Price, Item_Description ) 
VALUES (10, 'Burger with Ice Cream and Fries and Drinks', 250, 'Burger combo with fries, drink, and ice cream dessert');

INSERT INTO Menu (Item_id, Item_name, Item_Price, Item_Description ) 
VALUES (11, 'Spaghetti', 130, 'Classic spaghetti with tomato sauce and cheese');

INSERT INTO Menu (Item_id, Item_name, Item_Price, Item_Description ) 
VALUES (12, 'Burger with Spaghetti', 220, 'Classic burger served with a side of spaghetti');

INSERT INTO Menu (Item_id, Item_name, Item_Price, Item_Description) 
VALUES (13, 'Burger with Spaghetti, Fries and Drinks', 300, 'Burger combo with spaghetti, fries, and drink');


-- Classic Beef Burger (ID: 1)
INSERT INTO Menu_Breakdown VALUES (1, 1); -- Burger Bun
INSERT INTO Menu_Breakdown VALUES (2, 1); -- Beef Patty
INSERT INTO Menu_Breakdown VALUES (3, 1); -- Lettuce Leaf
INSERT INTO Menu_Breakdown VALUES (4, 1); -- Tomato Slice
INSERT INTO Menu_Breakdown VALUES (6, 1); -- Burger Sauce

-- Cheese Burger (ID: 2)
INSERT INTO Menu_Breakdown VALUES (1, 2);
INSERT INTO Menu_Breakdown VALUES (2, 2);
INSERT INTO Menu_Breakdown VALUES (3, 2);
INSERT INTO Menu_Breakdown VALUES (4, 2);
INSERT INTO Menu_Breakdown VALUES (5, 2); -- Cheese
INSERT INTO Menu_Breakdown VALUES (6, 2);

-- Burger with Drinks (ID: 3)
INSERT INTO Menu_Breakdown VALUES (1, 3);
INSERT INTO Menu_Breakdown VALUES (2, 3);
INSERT INTO Menu_Breakdown VALUES (3, 3);
INSERT INTO Menu_Breakdown VALUES (4, 3);
INSERT INTO Menu_Breakdown VALUES (6, 3);
INSERT INTO Menu_Breakdown VALUES (8, 3); -- Drink

-- Burger with Fries (ID: 4)
INSERT INTO Menu_Breakdown VALUES (1, 4);
INSERT INTO Menu_Breakdown VALUES (2, 4);
INSERT INTO Menu_Breakdown VALUES (3, 4);
INSERT INTO Menu_Breakdown VALUES (4, 4);
INSERT INTO Menu_Breakdown VALUES (6, 4);
INSERT INTO Menu_Breakdown VALUES (7, 4); -- Fries

-- Burger with Fries and Drinks (ID: 5)
INSERT INTO Menu_Breakdown VALUES (1, 5);
INSERT INTO Menu_Breakdown VALUES (2, 5);
INSERT INTO Menu_Breakdown VALUES (3, 5);
INSERT INTO Menu_Breakdown VALUES (4, 5);
INSERT INTO Menu_Breakdown VALUES (6, 5);
INSERT INTO Menu_Breakdown VALUES (7, 5);
INSERT INTO Menu_Breakdown VALUES (8, 5);

-- Burger with Ice Cream, Fries, and Drinks (ID: 10)
INSERT INTO Menu_Breakdown VALUES (1, 10);
INSERT INTO Menu_Breakdown VALUES (2, 10);
INSERT INTO Menu_Breakdown VALUES (3, 10);
INSERT INTO Menu_Breakdown VALUES (4, 10);
INSERT INTO Menu_Breakdown VALUES (6, 10);
INSERT INTO Menu_Breakdown VALUES (7, 10);
INSERT INTO Menu_Breakdown VALUES (8, 10);
INSERT INTO Menu_Breakdown VALUES (9, 10); -- Ice Cream

-- Burger with Spaghetti (ID: 12)
INSERT INTO Menu_Breakdown VALUES (1, 12);
INSERT INTO Menu_Breakdown VALUES (2, 12);
INSERT INTO Menu_Breakdown VALUES (3, 12);
INSERT INTO Menu_Breakdown VALUES (4, 12);
INSERT INTO Menu_Breakdown VALUES (6, 12);
INSERT INTO Menu_Breakdown VALUES (10, 12); -- Spaghetti Noodles
INSERT INTO Menu_Breakdown VALUES (11, 12); -- Spaghetti Sauce

-- Burger with Spaghetti, Fries, and Drinks (ID: 13)
INSERT INTO Menu_Breakdown VALUES (1, 13);
INSERT INTO Menu_Breakdown VALUES (2, 13);
INSERT INTO Menu_Breakdown VALUES (3, 13);
INSERT INTO Menu_Breakdown VALUES (4, 13);
INSERT INTO Menu_Breakdown VALUES (6, 13);
INSERT INTO Menu_Breakdown VALUES (7, 13);  -- Fries
INSERT INTO Menu_Breakdown VALUES (8, 13);  -- Drink
INSERT INTO Menu_Breakdown VALUES (10, 13); -- Spaghetti Noodles
INSERT INTO Menu_Breakdown VALUES (11, 13); -- Spaghetti Sauce
-- Fries (ID: 6)
INSERT INTO Menu_Breakdown VALUES (7, 6);

-- Fries and Drink (ID: 7)
INSERT INTO Menu_Breakdown VALUES (7, 7);
INSERT INTO Menu_Breakdown VALUES (8, 7);

-- Drink (ID: 8)
INSERT INTO Menu_Breakdown VALUES (8, 8);

-- Ice Cream (ID: 9)
INSERT INTO Menu_Breakdown VALUES (9, 9);

-- Spaghetti (ID: 11)
INSERT INTO Menu_Breakdown VALUES (10, 11);
INSERT INTO Menu_Breakdown VALUES (11, 11);


-- Order #1: Juan Dela Cruz (Classic Beef Burger, Fries and Drink)
-- Order Price: 350, No discount (Juan Dela Cruz is senior but no PWD)
INSERT INTO Orders (Order_id, Order_Date, Order_Price, Discount, Total, Status_id, Staff_id, Customer_id)
VALUES (1, SYSDATE, 350, 0, 350, 1, 101, 1);

-- Order #2: Maria Santos (Cheese Burgers, Drinks)
-- Order Price: 505, 20% discount (Maria Santos is PWD)
-- Discount: 505 * 0.20 = 101, Total = 505 - 101 = 404
INSERT INTO Orders (Order_id, Order_Date, Order_Price, Discount, Total, Status_id, Staff_id, Customer_id)
VALUES (2, SYSDATE, 505, 101, 404, 1, 102, 2);

-- Order #3: Jose Rizal (Burger with Fries and Drinks, Ice Cream)
-- Order Price: 280, 20% discount (Jose Rizal is senior and PWD)
-- Discount: 280 * 0.20 = 56, Total = 280 - 56 = 224
INSERT INTO Orders (Order_id, Order_Date, Order_Price, Discount, Total, Status_id, Staff_id, Customer_id)
VALUES (3, SYSDATE, 280, 56, 224, 1, 103, 3);

-- Order #4: Ana Reyes (Burger with Spaghetti, Spaghetti)
-- Order Price: 350, No discount (Ana Reyes is neither senior nor PWD)
INSERT INTO Orders (Order_id, Order_Date, Order_Price, Discount, Total, Status_id, Staff_id, Customer_id)
VALUES (4, SYSDATE, 350, 0, 350, 1, 104, 4);

-- Order #5: Pedro Gonzales (Burger with Ice Cream, Fries and Drinks, Cheese Burgers, Fries and Drink)
-- Order Price: 630, No discount (Pedro Gonzales is neither senior nor PWD)
INSERT INTO Orders (Order_id, Order_Date, Order_Price, Discount, Total, Status_id, Staff_id, Customer_id)
VALUES (5, SYSDATE, 630, 0, 630, 1, 105, 5);



-- Order #1: 2 Classic Beef Burgers, 1 Fries and Drink
INSERT INTO Orders_Items (Order_Item_Quantity, Order_Item_Amount, Item_id, Order_ID)
VALUES (2, 240, 1, 1);

INSERT INTO Orders_Items (Order_Item_Quantity, Order_Item_Amount, Item_id, Order_ID)
VALUES (1, 110, 7, 1);

-- Order #2: 3 Cheese Burgers, 2 Drinks, 1 Ice Cream
INSERT INTO Orders_Items (Order_Item_Quantity, Order_Item_Amount, Item_id, Order_ID)
VALUES (3, 405, 2, 2);

INSERT INTO Orders_Items (Order_Item_Quantity, Order_Item_Amount, Item_id, Order_ID)
VALUES (2, 100, 8, 2);

INSERT INTO Orders_Items (Order_Item_Quantity, Order_Item_Amount, Item_id, Order_ID)
VALUES (1, 80, 9, 2);

-- Order #3: 1 Burger with Fries and Drinks, 2 Ice Creams
INSERT INTO Orders_Items (Order_Item_Quantity, Order_Item_Amount, Item_id, Order_ID)
VALUES (1, 200, 5, 3);

INSERT INTO Orders_Items (Order_Item_Quantity, Order_Item_Amount, Item_id, Order_ID)
VALUES (2, 160, 9, 3);

-- Order #4: 1 Burger with Spaghetti, 1 Spaghetti, 1 Drink
INSERT INTO Orders_Items (Order_Item_Quantity, Order_Item_Amount, Item_id, Order_ID)
VALUES (1, 220, 12, 4);

INSERT INTO Orders_Items (Order_Item_Quantity, Order_Item_Amount, Item_id, Order_ID)
VALUES (1, 130, 11, 4);

INSERT INTO Orders_Items (Order_Item_Quantity, Order_Item_Amount, Item_id, Order_ID)
VALUES (1, 50, 8, 4);

-- Order #5: 1 Burger with Ice Cream and Fries and Drinks, 2 Cheese Burgers, 1 Fries and Drink
INSERT INTO Orders_Items (Order_Item_Quantity, Order_Item_Amount, Item_id, Order_ID)
VALUES (1, 250, 10, 5);

INSERT INTO Orders_Items (Order_Item_Quantity, Order_Item_Amount, Item_id, Order_ID)
VALUES (2, 270, 2, 5);

INSERT INTO Orders_Items (Order_Item_Quantity, Order_Item_Amount, Item_id, Order_ID)
VALUES (1, 110, 7, 5);


-- Order #6: Juan Dela Cruz - 1 Cheese Burger, 1 Drink
-- Price: 270, No discount
INSERT INTO Orders VALUES (6, TO_DATE('2025-05-28','YYYY-MM-DD'), 270, 0, 270, 1, 101, 1);

INSERT INTO Orders_Items VALUES (1, 135, 2, 6);
INSERT INTO Orders_Items VALUES (1, 135, 8, 6);

-- Order #7: Maria Santos - 2 Classic Beef Burgers
-- Price: 240, Discount: 48, Total: 192
INSERT INTO Orders VALUES (7, TO_DATE('2025-05-28','YYYY-MM-DD'), 240, 48, 192, 1, 102, 2);

INSERT INTO Orders_Items VALUES (2, 240, 1, 7);

-- Order #8: Jose Rizal - 1 Spaghetti, 1 Drink
-- Price: 180, Discount: 36, Total: 144
INSERT INTO Orders VALUES (8, TO_DATE('2025-05-28','YYYY-MM-DD'), 180, 36, 144, 1, 103, 3);

INSERT INTO Orders_Items VALUES (1, 130, 11, 8);
INSERT INTO Orders_Items VALUES (1, 50, 8, 8);

-- Order #9: Ana Reyes - 1 Ice Cream
-- Price: 80, No discount
INSERT INTO Orders VALUES (9, TO_DATE('2025-05-28','YYYY-MM-DD'), 80, 0, 80, 1, 104, 4);

INSERT INTO Orders_Items VALUES (1, 80, 9, 9);

-- Order #10: Pedro Gonzales - 2 Fries and Drinks
-- Price: 220, No discount
INSERT INTO Orders VALUES (10, TO_DATE('2025-05-28','YYYY-MM-DD'), 220, 0, 220, 1, 105, 5);

INSERT INTO Orders_Items VALUES (2, 220, 7, 10);

-- Order #11: Juan Dela Cruz - 1 Burger with Fries and Drinks
-- Price: 200, No discount
INSERT INTO Orders VALUES (11, TO_DATE('2025-05-29','YYYY-MM-DD'), 200, 0, 200, 1, 101, 1);

INSERT INTO Orders_Items VALUES (1, 200, 5, 11);

-- Order #12: Maria Santos - 1 Burger with Spaghetti, 1 Ice Cream
-- Price: 300, Discount: 60, Total: 240
INSERT INTO Orders VALUES (12, TO_DATE('2025-05-29','YYYY-MM-DD'), 300, 60, 240, 1, 102, 2);

INSERT INTO Orders_Items VALUES (1, 220, 12, 12);
INSERT INTO Orders_Items VALUES (1, 80, 9, 12);

-- Order #13: Jose Rizal - 1 Cheese Burger, 2 Ice Creams
-- Price: 305, Discount: 61, Total: 244
INSERT INTO Orders VALUES (13, TO_DATE('2025-05-29','YYYY-MM-DD'), 305, 61, 244, 1, 103, 3);

INSERT INTO Orders_Items VALUES (1, 145, 2, 13);
INSERT INTO Orders_Items VALUES (2, 160, 9, 13);

-- Order #14: Ana Reyes - 2 Classic Beef Burgers, 1 Drink
-- Price: 290, No discount
INSERT INTO Orders VALUES (14, TO_DATE('2025-05-29','YYYY-MM-DD'), 290, 0, 290, 1, 104, 4);

INSERT INTO Orders_Items VALUES (2, 240, 1, 14);
INSERT INTO Orders_Items VALUES (1, 50, 8, 14);

-- Order #15: Pedro Gonzales - 1 Spaghetti, 1 Cheese Burger
-- Price: 275, No discount
INSERT INTO Orders VALUES (15, TO_DATE('2025-05-29','YYYY-MM-DD'), 275, 0, 275, 1, 105, 5);

INSERT INTO Orders_Items VALUES (1, 130, 11, 15);
INSERT INTO Orders_Items VALUES (1, 145, 2, 15);


-- Order #16: Juan Dela Cruz - 1 Ice Cream
INSERT INTO Orders VALUES (16, TO_DATE('2025-05-30','YYYY-MM-DD'), 80, 0, 80, 1, 101, 1);

INSERT INTO Orders_Items VALUES (1, 80, 9, 16);

-- Order #17: Maria Santos - 1 Burger with Ice Cream and Fries and Drinks
-- Price: 250, Discount: 50, Total: 200
INSERT INTO Orders VALUES (17, TO_DATE('2025-05-30','YYYY-MM-DD'), 250, 50, 200, 1, 102, 2);

INSERT INTO Orders_Items VALUES (1, 250, 10, 17);

-- Order #18: Jose Rizal - 2 Spaghetti
-- Price: 260, Discount: 52, Total: 208
INSERT INTO Orders VALUES (18, TO_DATE('2025-05-30','YYYY-MM-DD'), 260, 52, 208, 1, 103, 3);

INSERT INTO Orders_Items VALUES (2, 260, 11, 18);

-- Order #19: Ana Reyes - 1 Cheese Burger, 1 Fries and Drink
-- Price: 255, No discount
INSERT INTO Orders VALUES (19, TO_DATE('2025-05-30','YYYY-MM-DD'), 255, 0, 255, 1, 104, 4);

INSERT INTO Orders_Items VALUES (1, 145, 2, 19);
INSERT INTO Orders_Items VALUES (1, 110, 7, 19);

-- Order #20: Pedro Gonzales - 1 Burger with Fries and Drinks, 1 Drink
-- Price: 250, No discount
INSERT INTO Orders VALUES (20, TO_DATE('2025-05-30','YYYY-MM-DD'), 250, 0, 250, 1, 105, 5);

INSERT INTO Orders_Items VALUES (1, 200, 5, 20);
INSERT INTO Orders_Items VALUES (1, 50, 8, 20);

-- Order #21: Juan Dela Cruz - 2 Classic Beef Burgers
-- Price: 240, No discount (Senior but not PWD)
INSERT INTO Orders VALUES (21, TO_DATE('2025-05-31','YYYY-MM-DD'), 240, 0, 240, 1, 101, 1);

INSERT INTO Orders_Items VALUES (2, 240, 1, 21);

-- Order #22: Maria Santos - 1 Cheese Burger, 2 Drinks
-- Price: 190, 20% discount (PWD) → Discount: 38, Total: 152
INSERT INTO Orders VALUES (22, TO_DATE('2025-05-31','YYYY-MM-DD'), 190, 38, 152, 1, 102, 2);

INSERT INTO Orders_Items VALUES (1, 90, 2, 22);
INSERT INTO Orders_Items VALUES (2, 100, 8, 22);

-- Order #23: Jose Rizal - 1 Burger with Ice Cream and Fries and Drinks
-- Price: 250, 20% discount (Senior and PWD) → Discount: 50, Total: 200
INSERT INTO Orders VALUES (23, TO_DATE('2025-05-31','YYYY-MM-DD'), 250, 50, 200, 1, 103, 3);

INSERT INTO Orders_Items VALUES (1, 250, 10, 23);

-- Order #24: Ana Reyes - 1 Spaghetti, 1 Drink, 1 Ice Cream
-- Price: 260, No discount
INSERT INTO Orders VALUES (24, TO_DATE('2025-05-31','YYYY-MM-DD'), 260, 0, 260, 1, 104, 4);

INSERT INTO Orders_Items VALUES (1, 130, 11, 24);
INSERT INTO Orders_Items VALUES (1, 50, 8, 24);
INSERT INTO Orders_Items VALUES (1, 80, 9, 24);




--=======================REPORTS========================



--Report 1: Receipt Report
CREATE OR REPLACE VIEW View_Order_Itemized_Report AS 
SELECT 
    o.Order_id AS OR_NO,
    m.Item_name,
    oi.Order_Item_Quantity,
    oi.Order_Item_Amount,
    (
        SELECT SUM(oi2.Order_Item_Amount)
        FROM Orders_Items oi2
        WHERE oi2.Order_id = o.Order_id
    ) AS ORDER_Total,
    CASE 
        WHEN c.IsSenior = 1 OR c.IsPWD = 1 THEN 
            ROUND(
                (SELECT SUM(oi2.Order_Item_Amount) 
                 FROM Orders_Items oi2 
                 WHERE oi2.Order_id = o.Order_id) * 0.20, 2
            )
        ELSE 0
    END AS DISCOUNT,
    CASE 
        WHEN c.IsSenior = 1 OR c.IsPWD = 1 THEN 
            ROUND(
                (SELECT SUM(oi2.Order_Item_Amount) 
                 FROM Orders_Items oi2 
                 WHERE oi2.Order_id = o.Order_id) * 0.80, 2
            )
        ELSE
            (SELECT SUM(oi2.Order_Item_Amount) 
             FROM Orders_Items oi2 
             WHERE oi2.Order_id = o.Order_id)
    END AS FINAL_TOTAL,
    c.Customer_name,
    s.Staff_Fullname,
    o.Order_Date
FROM Orders o
JOIN Orders_Items oi ON o.Order_id = oi.Order_id
JOIN Menu m ON oi.Item_id = m.Item_id
JOIN Customers c ON o.Customer_id = c.Customer_id
JOIN Staff s ON o.Staff_id = s.Staff_id
ORDER BY o.Order_id, m.Item_name;



--Report 2 for ingredients usage
CREATE OR REPLACE VIEW View_Ingredient_Usage_Report AS
SELECT
    i.Ingredients_id,
    i.Ingredients_name,
    i.Inventory_id,
    m.Item_id,
    o.Order_Date,
    SUM(oi.Order_Item_Quantity) AS Total_Items_Used
FROM Orders_Items oi
JOIN Orders o ON oi.Order_id = o.Order_id
JOIN Menu_Breakdown m ON oi.Item_id = m.Item_id
JOIN Ingredients i ON m.Ingredients_id = i.Ingredients_id
JOIN Inventory inv ON i.Inventory_id = inv.Inventory_id
GROUP BY i.Ingredients_id, i.Ingredients_name, i.Inventory_id, m.Item_id, o.Order_Date
ORDER BY o.Order_Date, m.Item_id, i.Ingredients_id;


--Report 3: Total Sales per Menu Item
CREATE OR REPLACE VIEW Total_Sales_Per_Menu_Item AS
SELECT m.Item_name, 
    SUM(oi.Order_Item_Quantity) AS Total_Quantity_Sold, 
    SUM(oi.Order_Item_Amount) AS Total_Revenue
FROM Orders_Items oi
JOIN Menu m ON oi.Item_id = m.Item_id   
GROUP BY m.Item_name 
ORDER BY Total_Revenue DESC;


--Report 4: Daily Sales Report
CREATE OR REPLACE VIEW Daily_Sales_Report AS
SELECT 
    COUNT(*) AS Total_Orders,
    o.Order_Date,
    SUM(o.Order_Price) AS Total_Amount,
    SUM(o.Discount) AS Total_Discounts,
    SUM(o.Total) AS Net_Revenue
FROM Orders o
GROUP BY o.Order_Date
ORDER BY o.Order_Date;


--Report 5: Inventory Levels by Supplier
CREATE OR REPLACE VIEW Inventory_Levels AS
SELECT 
    i.Package_Amount,
    s.Supplier_name,
    i.Inventory_name,
    i.Expiry_Date
FROM Inventory i
JOIN Supplier s ON i.Supplier_id = s.Supplier_id
ORDER BY i.Package_Amount DESC, s.Supplier_name, i.Expiry_Date;


--Report 6: Ingredients used per day
CREATE OR REPLACE VIEW View_Ingredient_Usage_Daily_Summary AS
SELECT
    i.Ingredients_id,
    i.Ingredients_name,
    i.Inventory_id,
    o.Order_Date,
    SUM(oi.Order_Item_Quantity) AS Total_Items_Used
FROM Orders_Items oi
JOIN Orders o ON oi.Order_id = o.Order_id
JOIN Menu_Breakdown m ON oi.Item_id = m.Item_id
JOIN Ingredients i ON m.Ingredients_id = i.Ingredients_id
JOIN Inventory inv ON i.Inventory_id = inv.Inventory_id
GROUP BY i.Ingredients_id, i.Ingredients_name, i.Inventory_id, o.Order_Date
ORDER BY o.Order_Date, i.Ingredients_id;


--=========================View Reports=======================

SELECT * FROM View_Order_Itemized_Report;
SELECT * FROM View_Ingredient_Usage_Report;
SELECT * FROM Total_Sales_Per_Menu_Item;
SELECT * FROM Daily_Sales_Report;
SELECT * FROM Inventory_Levels;
SELECT * FROM View_Ingredient_Usage_Daily_Summary;


select * from inventory;
select * from supplier;
select * from ingredients;
select * from menu;
select * from menu_breakdown;
select m.*, i.Ingredients_name from menu_breakdown m inner join ingredients i on m.Ingredients_id = i.Ingredients_id;
select * from orders;
select * from order_status;
select * from Orders_Items;
select * from staff;
select * from customers;