using System;
using System.Collections.Generic;
using API.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API.Contexts
{
    public partial class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
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

        public async Task<Drawing?> FindDrawingAsync(int id)
        {
            try
            {
                return await Drawings.Where(x => x.DrawingId == id && !x.IsDeleted).FirstAsync();
            }
            catch (InvalidOperationException)
            {
                return null;
            }
        }

        public async Task<Event?> FindEventAsync(int id)
        {
            try
            {
                return await Events.Where(x => x.EventId == id && !x.IsDeleted).FirstAsync();
            }
            catch (InvalidOperationException)
            {
                return null;
            }
        }

        public async Task<Location?> FindLocationAsync(int id)
        {
            try
            {
                return await Locations.Where(x => x.LocationId == id && !x.IsDeleted).FirstAsync();
            }
            catch (InvalidOperationException)
            {
                return null;
            }
        }

        public async Task<Scorer?> FindScorerAsync(int id)
        {
            try
            {
                return await Scorers.Where(x => x.ScorerId == id && !x.IsDeleted).FirstAsync();
            }
            catch (InvalidOperationException)
            {
                return null;
            }
        }

        public async Task<Score?> FindScoreAsync(int id)
        {
            try
            {
                return await Scores.Where(x => x.ScoreId == id && !x.IsDeleted).FirstAsync();
            }
            catch (InvalidOperationException)
            {
                return null;
            }
        }

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

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.Drawings)
                    .HasForeignKey(d => d.EventId)
                    .HasConstraintName("FK__Drawing__EventId__09A971A2");
            });

            modelBuilder.Entity<Event>(entity =>
            {
                entity.ToTable("Event");

                entity.Property(e => e.EventName).HasMaxLength(95);

                entity.Property(e => e.FinishTime).HasColumnType("datetime");

                entity.Property(e => e.Notes).HasMaxLength(1023);

                entity.Property(e => e.StartTime).HasColumnType("datetime");

                entity.HasOne(d => d.Location)
                    .WithMany(p => p.Events)
                    .HasForeignKey(d => d.LocationId)
                    .HasConstraintName("FK__Event__LocationI__06CD04F7");
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

                entity.Property(e => e.LocationName)
                    .HasMaxLength(127)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Score>(entity =>
            {
                entity.ToTable("Score");

                entity.Property(e => e.ScoredAt)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Drawing)
                    .WithMany(p => p.Scores)
                    .HasForeignKey(d => d.DrawingId)
                    .HasConstraintName("FK__Score__DrawingId__0F624AF8");

                entity.HasOne(d => d.Scorer)
                    .WithMany(p => p.Scores)
                    .HasForeignKey(d => d.ScorerId)
                    .HasConstraintName("FK__Score__ScorerId__10566F31");
            });

            modelBuilder.Entity<Scorer>(entity =>
            {
                entity.ToTable("Scorer");

                entity.Property(e => e.Username)
                    .HasMaxLength(63)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Topic>(entity =>
            {
                entity.ToTable("Topic");

                entity.Property(e => e.TopicName).HasMaxLength(63);
            });

            modelBuilder.Entity<TopicScore>(entity =>
            {
                entity.HasOne(d => d.Score)
                    .WithMany(p => p.TopicScores)
                    .HasForeignKey(d => d.ScoreId)
                    .HasConstraintName("FK__TopicScor__Score__160F4887");

                entity.HasOne(d => d.Topic)
                    .WithMany(p => p.TopicScores)
                    .HasForeignKey(d => d.TopicId)
                    .HasConstraintName("FK__TopicScor__Topic__17036CC0");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
