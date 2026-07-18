"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useVocabularyDetail } from "@/hooks/useVocabularyDetail";
import { LoadingSpinner } from "@/components/ui/Loading";
//import VocabularyDetailLoading from "./VocabularyDetailLoading";
import VocabularyHeader from "./VocabularyHeader";
import VocabularyHero from "./VocabularyHero";
import VocabularyQuickStats from "./VocabularyQuickStats";
import VocabularyInformation from "./VocabularyInformation";
import EditVocabularyModal from "./EditVocabularyModal";
import DeleteVocabularyModal from "./DeleteVocabularyModal";

export default function VocabularyDetailPage() {
  const router = useRouter();

  const params = useParams();

  const id = params.id as string;

  const {
    loading,
    word,
    editForm,
    setEditForm,
    showEditModal,
    setShowEditModal,
    showDeleteModal,
    setShowDeleteModal,
    handleUpdate,
    handleDelete,
  } = useVocabularyDetail(
    id,
    () => router.push("/teacher/vocabulary")
  );

  if (loading || !word) {
    return (
      <LoadingSpinner label="Loading Vocabulary" />
    );
  }

  return (
    <div className="min-h-screen rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 p-8">

      <VocabularyHeader 
        onBack={() =>router.back()}
        onEdit={() =>setShowEditModal(true)}
        onDelete={() =>setShowDeleteModal(true)}
      />

      <VocabularyHero word={word}/>
      <VocabularyQuickStats word={word}/>
      <VocabularyInformation word={word}/>

      <EditVocabularyModal
        open={showEditModal}
        form={editForm}
        setForm={setEditForm}
        onClose={() =>setShowEditModal(false)}
        onSave={handleUpdate}
      />

      <DeleteVocabularyModal
        open={showDeleteModal}
        word={word}
        onClose={() =>setShowDeleteModal(false)}
        onDelete={handleDelete}
      />

    </div>
  );
}