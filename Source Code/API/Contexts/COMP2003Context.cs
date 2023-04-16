using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using API.Models.Entities;

namespace API.Contexts
{
    public partial class COMP2003Context : DbContext
    {
        public COMP2003Context()
        {
        }

        public COMP2003Context(DbContextOptions<COMP2003Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Drawing> Drawings { get; set; } = null!;
        public virtual DbSet<Event> Events { get; set; } = null!;
        public virtual DbSet<Location> Locations { get; set; } = null!;
        public virtual DbSet<Score> Scores { get; set; } = null!;
        public virtual DbSet<Scorer> Scorers { get; set; } = null!;
        public virtual DbSet<Topic> Topics { get; set; } = null!;
        public virtual DbSet<TopicScore> TopicScores { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Drawing>(entity =>
            {
                entity.ToTable("Drawing");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DrawersName).HasMaxLength(49);

                entity.Property(e => e.FileExt)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.FileId)
                    .HasMaxLength(99)
                    .IsUnicode(false);

                entity.Property(e => e.IsDeleted)
                    .HasColumnName("isDeleted")
                    .HasDefaultValueSql("((0))");

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.Drawings)
                    .HasForeignKey(d => d.EventId)
                    .HasConstraintName("FK__Drawing__EventId__3E52440B");
            });

            modelBuilder.Entity<Event>(entity =>
            {
                entity.ToTable("Event");

                entity.Property(e => e.EventName).HasMaxLength(95);

                entity.Property(e => e.FinishTime).HasColumnType("datetime");

                entity.Property(e => e.IsDeleted)
                    .HasColumnName("isDeleted")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Notes).HasMaxLength(1023);

                entity.Property(e => e.StartTime).HasColumnType("datetime");

                entity.HasOne(d => d.Location)
                    .WithMany(p => p.Events)
                    .HasForeignKey(d => d.LocationId)
                    .HasConstraintName("FK__Event__LocationI__3A81B327");
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.ToTable("Location");

                entity.Property(e => e.City)
                    .HasMaxLength(63)
                    .IsUnicode(false);

                entity.Property(e => e.Country)
                    .HasMaxLength(63)
                    .IsUnicode(false);

                entity.Property(e => e.IsDeleted)
                    .HasColumnName("isDeleted")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.LocationName)
                    .HasMaxLength(127)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Score>(entity =>
            {
                entity.ToTable("Score");

                entity.Property(e => e.IsDeleted)
                    .HasColumnName("isDeleted")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Notes).HasMaxLength(255);

                entity.Property(e => e.ScoredAt)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Drawing)
                    .WithMany(p => p.Scores)
                    .HasForeignKey(d => d.DrawingId)
                    .HasConstraintName("FK__Score__DrawingId__45F365D3");

                entity.HasOne(d => d.Scorer)
                    .WithMany(p => p.Scores)
                    .HasForeignKey(d => d.ScorerId)
                    .HasConstraintName("FK__Score__ScorerId__46E78A0C");
            });

            modelBuilder.Entity<Scorer>(entity =>
            {
                entity.ToTable("Scorer");

                entity.Property(e => e.IsDeleted)
                    .HasColumnName("isDeleted")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Username)
                    .HasMaxLength(63)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Topic>(entity =>
            {
                entity.ToTable("Topic");

                entity.Property(e => e.IsDeleted)
                    .HasColumnName("isDeleted")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.TopicName).HasMaxLength(63);
            });

            modelBuilder.Entity<TopicScore>(entity =>
            {
                entity.Property(e => e.IsDeleted)
                    .HasColumnName("isDeleted")
                    .HasDefaultValueSql("((0))");

                entity.HasOne(d => d.Score)
                    .WithMany(p => p.TopicScores)
                    .HasForeignKey(d => d.ScoreId)
                    .HasConstraintName("FK__TopicScor__Score__4E88ABD4");

                entity.HasOne(d => d.Topic)
                    .WithMany(p => p.TopicScores)
                    .HasForeignKey(d => d.TopicId)
                    .HasConstraintName("FK__TopicScor__Topic__4F7CD00D");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
