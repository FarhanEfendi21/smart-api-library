import { MemberModel } from '../models/memberModel.js';

export const MemberController = {
  // Mendapatkan semua daftar anggota
  async getAllMembers(req, res) {
    try {
      const members = await MemberModel.getAll();
      res.json(members);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Mendapatkan member berdasarkan ID
  async getMemberById(req, res) {
    try {
      const { id } = req.params;
      const member = await MemberModel.getById(id);
      if (!member) {
        return res.status(404).json({ error: "Member tidak ditemukan" });
      }
      res.json(member);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Mendaftarkan anggota baru
  async createMember(req, res) {
    try {
      const newMember = await MemberModel.create(req.body);
      res.status(201).json({
        message: "Anggota berhasil didaftarkan!",
        data: newMember
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Update member
  async updateMember(req, res) {
    try {
      const { id } = req.params;
      const updatedMember = await MemberModel.update(id, req.body);
      if (!updatedMember) {
        return res.status(404).json({ error: "Member tidak ditemukan" });
      }
      res.json({
        message: "Member berhasil diupdate",
        data: updatedMember
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async deleteMember(req, res) {
    const { id } = req.params;
    try {
      await MemberModel.delete(id);
      res.json({ message: "Member berhasil dihapus" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};