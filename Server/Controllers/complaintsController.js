import Complaints from '../Models/complaints.js';

export const getComplaints = async (req, res) => {
    const { id } = req.params;

    try {
        const complaints = await Complaints.find({ ID: id });

        if (complaints.length === 0) {
            return res.status(404).json({ message: 'No Complaints found' });
        }

        res.status(200).json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getActiveComplaints = async (req, res) => {
    const { id } = req.params;

    try {
        const complaints = await Complaints.find({ ID: id , Status: false});

        if (complaints.length === 0) {
            return res.status(404).json({ message: 'No Active Complaints found' });
        }

        res.status(200).json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createComplaint = async (req, res) => {
    const { ID, RoomNo, PhoneNo, UserName, Category, ComplaintDate, ResolvedDate, Specifications, PreferableTime, Discription } = req.body;

    // Validation (Example: Checking required fields)
    if (!ID || !RoomNo || !PhoneNo || !UserName || !Category || !ComplaintDate || !ResolvedDate || !Specifications) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const newComplaint = new Complaints({
        ID,
        RoomNo,
        PhoneNo,
        UserName,
        Category,
        ComplaintDate,
        ResolvedDate,
        Specifications,
        PreferableTime,
        Discription,
        Status: req.body.Status || false, // Use provided value or default to false
    });

    try {
        const savedComplaint = await newComplaint.save();
        res.status(201).json({ message: 'Complaint created successfully', data: savedComplaint });
    } catch (error) {
        console.error('Error creating complaint:', error);
        res.status(500).json({ message: 'Error creating complaint', error: error.message });
    }
};

export const deleteComplaint = async (req, res) => {
    const { id } = req.params; 

    try {
        const deletedComplaints = await Complaints.findByIdAndDelete(id);

        if (!deletedComplaints) {
            return res.status(404).json({ message: `Complain with ID ${id} not found` });
        }

        res.json({ message: `Complain with ID ${id} deleted successfully`, deleteComplaint });
    } catch (error) {
        console.error(`Error deleting complain with ID ${id}:`, error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const editComplaint = async (req, res) => {
    try {
        const complaintId = req.params.id;
        const updateData = req.body;

        if (!complaintId) {
            return res.status(400).json({ message: 'Complaint ID is required.' });
        }

        const updatedComplaint = await Complaints.findByIdAndUpdate(
            complaintId, 
            { $set: updateData },
            { new: true } 
        );

        if (!updatedComplaint) {
            return res.status(404).json({ message: 'Complaint not found.' });
        }

        res.status(200).json({ 
            message: 'Complaint updated successfully.', 
            data: updatedComplaint 
        });
    } catch (error) {
        console.error('Error updating complaint:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
