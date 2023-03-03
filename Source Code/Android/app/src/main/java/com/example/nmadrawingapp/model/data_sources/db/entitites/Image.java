package com.example.nmadrawingapp.model.data_sources.db.entitites;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import java.util.UUID;

@Entity
public class Image {

    private static final String EXTENSION = "webp";

    public Image(int eventId, String drawersName, int drawersAge, byte[] image) {
        this.drawersName = drawersName;
        this.uuid = UUID.randomUUID();
        this.extension = EXTENSION;
        this.drawersAge = drawersAge;
        this.image = image;
        this.eventId = eventId;
    }

    @PrimaryKey(autoGenerate = true)
    private int id;

    private int eventId;

    private UUID uuid;

    private String extension;

    private final int drawersAge;

    private final String drawersName;

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

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public int getDrawersAge() {
        return drawersAge;
    }

    public String getDrawersName() {
        return drawersName;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    //endregion

}
