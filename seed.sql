-- Inserts the starting records only when the table is empty.
INSERT INTO records (title, category, description, status)
SELECT * FROM (VALUES
  ('Wi-Fi drops in Lab 3', 'Network', 'The wireless signal disconnects every few minutes in Computer Lab 3.', 'Pending'),
  ('Install Python on lab PCs', 'Software', 'Python 3 is missing on the ten PCs in Lab 1 and is needed for class.', 'In progress'),
  ('Keyboard keys not working', 'Hardware', 'Several keys on the keyboard at desk 7 do not respond.', 'Completed'),
  ('Cannot print from library PC', 'Hardware', 'Print jobs stay in the queue and never reach the printer.', 'Pending'),
  ('Email login failing', 'Software', 'A student account shows an incorrect password message after reset.', 'In progress'),
  ('Projector will not detect laptop', 'Hardware', 'The projector in Room B12 shows no signal over HDMI.', 'Pending'),
  ('Slow internet in hostel block', 'Network', 'Pages take over a minute to load in the evening in Block C.', 'Completed'),
  ('Antivirus update needed', 'Software', 'The antivirus on the staff office computer is out of date.', 'In progress')
) AS v(title, category, description, status)
WHERE NOT EXISTS (SELECT 1 FROM records);
