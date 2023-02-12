package com.example.nmadrawingapp.model.data_sources.db.daos;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import java.util.List;

@Dao
public
interface ImageDao {

    @Query("SELECT * FROM image")
    LiveData<List<Image>> getAll();

    @Query("SELECT * FROM image WHERE id == (:id)")
    LiveData<Image> findById(int id);

    @Insert
    void insert(Image image);

    @Delete
    void delete(Image image);

    @Query("SELECT COUNT(id) FROM image")
    LiveData<Integer> getCount();
}
