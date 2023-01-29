package com.example.nmadrawingapp.model.data_sources.db.entitites;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import java.util.UUID;

@Entity
public class Image {

    public Image(UUID uuid, String extension, byte[] image) {
        this.uuid = uuid;
        this.extension = extension;
        this.image = image;
    }

    @PrimaryKey(autoGenerate = true)
    private int id;

    private final UUID uuid;

    private final String extension;

    @ColumnInfo(typeAffinity = ColumnInfo.BLOB)
    private final byte[] image;

    //region getters & setters

    public int getId() {
        return id;
    }

    public UUID getUuid() {
        return uuid;
    }

    public String getExtension() {
        return extension;
    }

    public byte[] getImage() {
        return image;
    }

    public void setId(int id) {
        this.id = id;
    }

    //endregion

}
