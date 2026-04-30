from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, JSON, Text
from sqlalchemy.orm import relationship
from .database import Base


class Batch(Base):
    __tablename__ = "batches"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    total = Column(Integer, default=0)
    processed = Column(Integer, default=0)
    failed = Column(Integer, default=0)
    status = Column(String, default="pending")  # pending | processing | completed | failed

    submissions = relationship("Submission", back_populates="batch")


class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    batch_id = Column(Integer, ForeignKey("batches.id"), nullable=True)

    # Personal info
    name = Column(String, nullable=False)
    date_of_birth = Column(String, nullable=True)
    gender = Column(String, nullable=False)
    nationality = Column(String, nullable=True)

    # Self-reported measurements
    height_cm = Column(Float, nullable=False)
    weight_kg = Column(Float, nullable=True)
    bust_cm = Column(Float, nullable=True)
    waist_cm = Column(Float, nullable=True)
    hips_cm = Column(Float, nullable=True)
    inseam_cm = Column(Float, nullable=True)
    neck_cm = Column(Float, nullable=True)
    shoe_size_eu = Column(Float, nullable=True)
    dress_size = Column(String, nullable=True)
    hair_color = Column(String, nullable=True)
    eye_color = Column(String, nullable=True)
    has_implants = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="pending")  # pending | processing | completed | failed
    error_message = Column(Text, nullable=True)

    batch = relationship("Batch", back_populates="submissions")
    photos = relationship("Photo", back_populates="submission", cascade="all, delete-orphan")
    result = relationship("AnalysisResult", back_populates="submission", uselist=False, cascade="all, delete-orphan")


class Photo(Base):
    __tablename__ = "photos"

    id = Column(Integer, primary_key=True, index=True)
    submission_id = Column(Integer, ForeignKey("submissions.id"), nullable=False)
    photo_type = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    is_valid = Column(Boolean, default=True)
    validation_notes = Column(Text, nullable=True)

    submission = relationship("Submission", back_populates="photos")


class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True, index=True)
    submission_id = Column(Integer, ForeignKey("submissions.id"), unique=True, nullable=False)

    # Measurements
    photo_measurements = Column(JSON, nullable=True)
    confirmed_measurements = Column(JSON, nullable=True)
    final_measurements = Column(JSON, nullable=True)
    measurement_flags = Column(JSON, nullable=True)

    # Body analysis
    body_ratios = Column(JSON, nullable=True)
    body_shape = Column(String, nullable=True)

    # Facial analysis
    facial_metrics = Column(JSON, nullable=True)
    face_shape = Column(String, nullable=True)

    # Market scores (0-100)
    eu_score = Column(Float, nullable=True)
    us_score = Column(Float, nullable=True)
    asian_score = Column(Float, nullable=True)
    eu_breakdown = Column(JSON, nullable=True)
    us_breakdown = Column(JSON, nullable=True)
    asian_breakdown = Column(JSON, nullable=True)
    eu_notes = Column(JSON, nullable=True)
    us_notes = Column(JSON, nullable=True)
    asian_notes = Column(JSON, nullable=True)

    # Predictions
    fashion_categories = Column(JSON, nullable=True)
    market_recommendation = Column(JSON, nullable=True)

    # Summary
    overall_score = Column(Float, nullable=True)
    potential_verdict = Column(String, nullable=True)
    strengths = Column(JSON, nullable=True)
    improvements = Column(JSON, nullable=True)
    age_at_submission = Column(Integer, nullable=True)

    llm_narratives = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    submission = relationship("Submission", back_populates="result")
